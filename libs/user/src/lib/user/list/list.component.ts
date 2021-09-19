import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../user.types';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {

  @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  drawerMode: 'side' | 'over' = 'side';
  openStatus = false;
  users$: Observable<User[]>;
  usersCount: number = 0;
  searchInputControl: FormControl = new FormControl();
  selectedUser: User | null = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userService: UserService,
    @Inject(DOCUMENT) private _document: any,
    private _router: Router,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Get the user list
    this.users$ = this._userService.users$;
    this._userService.users$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((users: User[]) => {
        // Update the counts
        this.usersCount = users.length;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the user
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        console.log(user)
        // Update the selected user
        this.selectedUser = user;
        if (user !== undefined  || user !== null) {
          this.matDrawer.open();
          this._changeDetectorRef.markForCheck();
        } else {
          this.matDrawer.close();
          this._changeDetectorRef.markForCheck();
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        switchMap((query) =>
          // Search
          this._userService.searchUsers(query)
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

  /**
   * On backdrop clicked
   */
  onBackdropClicked(): void {
    // Go back to the list
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });

    // Mark for check
    this.matDrawer.close();
    this._changeDetectorRef.markForCheck();
  }

  /**
 * Create User
 */
  createUser(): void {
    // Create the contact
    this._userService.createUser().subscribe((newUser) => {
      // Go to the new contact
      this._router.navigate(['./', newUser.id], {
        relativeTo: this._activatedRoute,
      });

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

}
