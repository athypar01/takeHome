import { newUserInit } from './../../+state/selectors/frnds_app.selectors';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { ConfirmationService } from '@secureworks/confirmation';
import { ListComponent } from '../list/list.component';
import {
  getAllUsers,
  getSelectedUser,
  isEditStatus,
} from '../../+state/selectors/frnds_app.selectors';
import { FrndsAppService } from '../../services/frnds_app.service';
import { User } from '../../types/frnds_app_state.interface';
import { UpdateUser } from '../../+state/actions/frnds_app_entity.actions';
import {
  addNewUser,
  clearUserSelection,
  deleteExistingUser,
  editExistingUserTrigger,
} from '../../+state/actions/frnds_app_http.actions';

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
  errorMessages: string[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: ListComponent,
    private _confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,
    private _frndsAppSvc: FrndsAppService,
    private store: Store
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void {
    // Edit mode check for editable form field
    this.editMode$ = this.store
      .select(isEditStatus)
      .pipe(takeUntil(this._unsubscribeAll));

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
      name: new FormControl('', [
        Validators.required,
        Validators.pattern("^([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}"),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(3),
      ]),
      weight: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(4),
      ]),
      friendsNameList: new FormControl([]),
      friends: new FormControl([]),
    });
  }

  initializeValues() {
    // Users List
    this.users$ = this.store
      .select(getAllUsers)
      .pipe(takeUntil(this._unsubscribeAll));

    // Selected User List
    this.user$ = this.store
      .select(getSelectedUser)
      .pipe(takeUntil(this._unsubscribeAll));

    // Map the user list to populated the friends' dropdown for
    // a user after excluding the selected user

    // The block also checks the values to be populated in the form field
    this.user$.subscribe((res) => {
      this.userForm.reset();

      if (res) {
        this.user$ = of(res);
        this.users$.subscribe((user) => {
          if (user) {
            this.filteredUsers = user.filter((res2) => res2.id !== res.id);
          } else {
            this.filteredUsers = [];
          }
        });
        this.userForm.patchValue(res);
        if (res && res.friends) {
          const names: string[] = [];
          res.friends.forEach((friend: User) => {
            names.push(friend.name);
          });
          this.friendsFormControl.setValue(names);
        }
        this._changeDetectorRef.markForCheck();
      } else {
        this.users$.subscribe((user) => {
          if (user) {
            this.filteredUsers = user;
          }
        });
        this.userForm.reset();
        this.user$ = of(new User());
      }

    });

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Form control for the friends' name
   */
  get friendsFormControl() {
    return this.userForm.get('friendsNameList') as FormControl;
  }

  /**
 * Error message handler for forms
 */
  getErrorMessage() {
    this.errorMessages = [];

    this.userForm.markAllAsTouched();

    if (
      this.userForm.controls.name.hasError('required') &&
      this.userForm.controls.name.touched
    ) {
      this.errorMessages.push('Name is required');
    }

    if (
      this.userForm.controls.name.hasError('pattern') &&
      this.userForm.controls.name.touched
    ) {
      this.errorMessages.push('Name must be min 2 characters');
      this.errorMessages.push('Name must have a max of 30 characters');
      this.errorMessages.push(
        'Name must not begin or end with special charcters'
      );
    }

    if (
      this.userForm.controls.age.hasError('required') &&
      this.userForm.controls.age.touched
    ) {
      this.errorMessages.push('Age is required');
    }

    if (
      this.userForm.controls.weight.hasError('required') &&
      this.userForm.controls.weight.touched
    ) {
      this.errorMessages.push('Weight is required');
    }

    if (
      this.userForm.controls.age.hasError('min') &&
      this.userForm.controls.age.touched
    ) {
      this.errorMessages.push('Min age must be above 1');
    }

    if (
      this.userForm.controls.weight.hasError('min') &&
      this.userForm.controls.weight.touched
    ) {
      this.errorMessages.push('Min age must be above 1');
    }

    if (
      this.userForm.controls.age.hasError('pattern') &&
      this.userForm.controls.age.touched
    ) {
      this.errorMessages.push('Age must be numeric');
      this.errorMessages.push('Max age is 999');
    }

    if (
      this.userForm.controls.weight.hasError('pattern') &&
      this.userForm.controls.weight.touched
    ) {
      this.errorMessages.push('Weight must be numeric');
      this.errorMessages.push('Max weight is 9999');
    }

    if (
      this.userForm.controls.age.hasError('maxlength') &&
      this.userForm.controls.age.touched
    ) {
      this.errorMessages.push('Max age is 999');
    }

    if (
      this.userForm.controls.weight.hasError('maxlength') &&
      this.userForm.controls.weight.touched
    ) {
      this.errorMessages.push('Max weight is 9999');
    }

    this._changeDetectorRef.markForCheck();

    if (this.errorMessages.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Compate funciton for multiselect
   */
  public objectComparisonFunction = function (
    option: any,
    value: any
  ): boolean {
    return option?.id === value?.id;
  };

  /**
   * Hack to show to the name of friends on selections
   *
   * @param event
   */
  onUserSelection(event: any) {
    const names: string[] = [];
    event.value.forEach((x: any) => {
      names.push(x.name);
    });
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
    this.store.dispatch(editExistingUserTrigger({ id: id, user: user }));
    const users = this._frndsAppSvc.userList;
    if (user) {
      this.filteredUsers = users.filter((res2) => res2.id !== user.id);
    } else {
      this.filteredUsers = [];
    }
  }

  cancel() {
    this.store.dispatch(clearUserSelection());
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
      if (userData.friends && userData.friends.length > 0) {
        userData.chartData = this._frndsAppSvc.generateChartData(
          userData.friends
        );
      }
      this.store.dispatch(new UpdateUser(userData));
    } else {
      userData.id = uuid();
      userData.chartData = [];
      if (userData.friends && userData.friends.length > 0) {
        userData.chartData = this._frndsAppSvc.generateChartData(
          userData.friends
        );
      }
      this.store.dispatch(addNewUser({ user: userData }));
    }
    // this.store.dispatch(getUserById({ id: userData.id }));
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
        this.store.dispatch(deleteExistingUser({ id: id }));
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }
}
