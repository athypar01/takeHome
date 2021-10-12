/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { User } from './../../types/frnds-app-state.interface';
import { frndsAppInitAction } from './../../+state/actions/frnds_init.actions';
import { getAllUsers, getSelectedId } from '../../+state/selectors/frnds_app.selectors';
import { frndsAppQueryAction } from '../../+state/actions/frnds-query.actions';
import { frndsAppNewUserClickAction } from '../../+state/actions/frnds_new_user.actions';
import { frndsAppSelectUserClickAction } from '../../+state/actions/frnds_select_user.actions';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListComponent implements OnInit {

  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over' = 'side';

  isUserSelected$: Observable<string | null | undefined>;
  users$: Observable<User[] | null>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  openStatus = true;
  searchInputControl: FormControl = new FormControl();
  selectedUser: User | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private store: Store
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store.dispatch(frndsAppInitAction())
    this.initializeValues();

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap(async (query) =>
          // Search
          this.store.dispatch(frndsAppQueryAction({ query }))
        )
      )
      .subscribe();

    // Subscribe to MatDrawer opened change
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        this.selectedUser = null;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  /**
 * On destroy
 */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  initializeValues() {
    this.users$ = this.store.select(getAllUsers);
    this.validateSelection();
  }

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    this.matDrawer.close();
    this._changeDetectorRef.markForCheck();
  }

  /**
 * Create User
 */
  createUser(): void {
    this.store.dispatch(frndsAppNewUserClickAction());
    this.validateSelection();
  }

  /**
 * Select User from the list
 */
  selectUser(currentId: string): void {
    this.store.dispatch(frndsAppSelectUserClickAction({ query: currentId }));
    this.validateSelection();
  }

  /**
 * Navigate to view depending on user selection
 */
  validateSelection(): void {
    this.isUserSelected$ = this.store.select(getSelectedId);
    this.isUserSelected$.subscribe((currentId: string | null | undefined) => {
      // Open the drawer if user is selected or a new user is created
      // Close drawer if in list view
      if (currentId !== null && currentId !== undefined) {
        this.openStatus = true;
      } else {
        this.openStatus = false;
      }
    });
  }
}
