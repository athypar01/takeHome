import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { ConfirmationService } from '@secureworks/confirmation';
import { ListComponent } from '../list/list.component';
import { User } from '../../types/frnds-app-state.interface';
import { getAllUsers, getSelectedUser, isEditStatus } from '../../+state/selectors/frnds_app.selectors';
import { frndsAppSelectUserClickAction, frndsAppUpdateUserEditAction, frndsAppUpdateUserInitAction } from '../../+state/actions/frnds_select_user.actions';
import { addNewUser } from '../../+state/actions/frnds_new_user.actions';
import { clearUserSelection, deleteExistingUser } from '../../+state/actions/frnds_detail.actions';
import { FrndsAppService } from '../../services/frnds_app.service';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {

  selected: string;
  friends: User[] = [];
  filteredUsers: User[] = [];

  userForm: FormGroup;
  editMode$: Observable<boolean>;
  user$: Observable<User | null | undefined>;
  users$: Observable<User[] | null | undefined>;
  selectedId$: Observable<string | null | undefined>;
  currentUserId: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: ListComponent,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private _frndsAppSvc: FrndsAppService,
    private _store: Store
  ) { }

  ngOnInit(): void {
    this.editMode$ = this._store.select(isEditStatus).pipe(takeUntil(this._unsubscribeAll));
    this.initializeForm();
    // Open the drawer
    this._userListComponent.matDrawer?.open();
    this.initializeValues();
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

  initializeForm() {
    // Create the user form
    this.userForm = this._formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      friendsNameList: new FormControl([], [Validators.required]),
      friends: new FormControl([]),
    });
  }

  /**
   * Form control for the friends' name
   */
  get friendsFormControl() {
    return this.userForm.get('friendsNameList') as FormControl;
  }

  initializeValues() {
    this.users$ = this._store.select(getAllUsers).pipe(takeUntil(this._unsubscribeAll));
    this.user$ = this._store.select(getSelectedUser).pipe(takeUntil(this._unsubscribeAll));
    this.user$.subscribe(res => {
      this.userForm.reset();
      if (res) {
        this.user$ = of(res);
        this.users$.subscribe((user) => {
          if (user) {
            this.filteredUsers = user.filter(res2 => res2.id !== res.id);
          } else {
            this.filteredUsers = [];
          }
        })
        this.userForm.patchValue(res);
        if (res && res.friends) {
          const names: string[] = [];
          res.friends.forEach((x) => {
            names.push(x.name);
          })
          this.friendsFormControl.setValue(names);
        }
        this._changeDetectorRef.markForCheck();
      } else {
        this.users$.subscribe((user) => {
          if (user) {
            this.filteredUsers = user;
          }
        })
        this.userForm.reset();
        this.user$ = of(new User());
      }
    });
    this._changeDetectorRef.markForCheck();
  }


  /**
 * Compate funciton for multiselect
 */
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option?.id === value?.id;
  }

  /**
  * Hack to show to the name of friends on selections
  *
  * @param event
  */
  onUserSelection(event: any) {
    const names: string[] = []
    event.value.forEach((x: any) => {
      names.push(x.name)
    })
    this.userForm.get('friends')?.setValue(event.value);
    this.friendsFormControl?.setValue(names);
    this._changeDetectorRef.markForCheck();
  }

  /**
 * Toggle edit mode
 *
 * @param editMode
 */
  toggleEditMode(id: string, user: User): void {
    this._store.dispatch(frndsAppUpdateUserInitAction({ id: id, user: user }));
    this._changeDetectorRef.markForCheck();
    const users = this._frndsAppSvc.userList;
    if (user) {
      this.filteredUsers = users.filter(res2 => res2.id !== user.id);
    } else {
      this.filteredUsers = [];
    }
  }

  cancel() {
    this._store.dispatch(clearUserSelection());
  }

  /**
   * Close the drawer
   */
  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._userListComponent.matDrawer.close();
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  /**
 * Update the user and user contacts
 */

  updateUser(): void {
    // Get the contact object
    const userData = this.userForm.value;
    if (userData.id && userData.id !== 'new') {
      this._store.dispatch(frndsAppUpdateUserEditAction({ id: userData.id, user: userData }));
    } else {
      userData.id = uuid();
      userData.chartData = [];
      if (userData.friends && userData.friends.length > 0) {
        userData.chartData = this._frndsAppSvc.generateChartData(userData.friends);
      }
      this._store.dispatch(addNewUser({ user: userData }));
    }
    this._store.dispatch(frndsAppSelectUserClickAction({ query: userData.id }));
    this._changeDetectorRef.markForCheck();
  }

  /**
 * Delete the user and user contacts
 */
  deleteUser() {
    // Open the confirmation dialog
    const confirmation = this._confirmationService.open({
      title: 'Delete User',
      message:
        'Are you sure you want to delete this user? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the current user id
        const id = this.userForm.controls.id.value;
        this._store.dispatch(deleteExistingUser({ id: id }));
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }
}
