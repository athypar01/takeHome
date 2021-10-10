import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { ConfirmationService } from '@secureworks/confirmation';
import { ListComponent } from '../list/list.component';
import { User } from '../../types/frnds-app-state.interface';
import { FrndsAppService } from '../../services/frnds_app.service';
import { getAllUsers, getSelectedUser, isEditStatus } from '../../+state/selectors/frnds_app.selectors';
import { AddUser, frndsAppSelectUserClickAction, frndsAppUpdateUserEditAction, UpdateUser } from '../../+state/actions/frnds_select_user.actions';
import { addNewUser } from '../../+state/actions/frnds_new_user.actions';
import { deleteExistingUser } from '../../+state/actions/frnds_detail.actions';

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
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public chartData: Array<any>;
  data: SimpleDataModel[] = [
    {
      name: "text1",
      value: "95"
    },
    {
      name: "text1",
      value: "4"
    },
    {
      name: "text3",
      value: "1"
    }
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: ListComponent,
    private _confirmationService: ConfirmationService,
    private _frndsAppService: FrndsAppService,
    private _formBuilder: FormBuilder,
    private _router: Router,
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
      console.log(res)
      if (res) {
        this.user$ = of(res);
        this.userForm.patchValue(res);
        this._changeDetectorRef.markForCheck();
      } else {
        this.userForm.reset();
        this.user$ = of(new User());
      }
    });

    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
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
    this._store.dispatch(frndsAppUpdateUserEditAction({ id, user }));
    this._changeDetectorRef.markForCheck();
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

  createUser(): void {
    // Get the contact object
    const userData = this.userForm.value;



    // Update the contact on the server
    this._frndsAppService.createUser(userData).subscribe(res => {
      this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    });
  }

  updateUser(): void {
    // Get the contact object
    const userData = this.userForm.value;
    if (userData.id && userData.id !== 'new') {
      this._store.dispatch(new UpdateUser(userData));
    } else {
      userData.id = uuid();
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

        this._store.dispatch(deleteExistingUser({id: id}));

        // // Delete the user
        // this._frndsAppService.deleteContact(id).subscribe((isDeleted) => {

        //   console.log(isDeleted)
        //   // Return if the user wasn't deleted...
        //   if (!isDeleted) {
        //     return;
        //   } else {
        //     // Navigate to the parent view
        //     this._router.navigate(['../'], {
        //       relativeTo: this._activatedRoute,
        //     });
        //   }

        //   // Toggle the edit mode off
        //   // this.toggleEditMode(false);
        // });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }


  generateData() {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}


export interface SimpleDataModel {
  name: string;
  value: string;
  color?: string;
}
