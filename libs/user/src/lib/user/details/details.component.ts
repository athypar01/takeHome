import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { ConfirmationService } from '@secureworks/confirmation';
import { ListComponent } from '../list/list.component';
import { UserService } from '../user.service';
import { User } from '../user.types';

@Component({
  selector: 'user-details',
  templateUrl: './details.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  user: User;
  selected: string;
  userForm: FormGroup;
  users: User[];
  friends: User[] = [];
  filteredUsers: User[] = [];
  editMode = false;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: ListComponent,
    private _confirmationService: ConfirmationService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    // Open the drawer
    this._userListComponent.matDrawer?.open();

    // Create the user form
    this.userForm = this._formBuilder.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      friendsNameList: new FormControl([], [Validators.required]),
      friends: new FormControl([]),
    });

    // Get the user list
    this._userService.users$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((users: User[]) => {
        this.users = users;
        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the individual user
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;
        this.userForm.patchValue(this.user);
        this.toggleEditMode(false);

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });

    // Get the friend of individual user
    this._userService.friend$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((friends: User[]) => {
        this.friends = friends;


        if (this.friends.length > 0) {
          // Iterate through them
          const name: string[] = [];
          const user: User[] = [];
          this.friends.forEach((friend: User) => {
            name.push(friend?.name);
            user.push(friend)
          });
          this.userForm.get('friends')?.setValue(user);
          this.userForm.get('friendsNameList')?.setValue(name || null);
        }
        this._changeDetectorRef.markForCheck();
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
 * Form control for the friends' name
 */
  get friendsFormControl() {
    return this.userForm.get('friendsNameList') as FormControl;
  }

  /**
 * Compate funciton for multiselect
 */
  public objectComparisonFunction = function (option: any, value: any): boolean {
    return option.id === value.id;
  }

  /**
 * /**
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
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }

    // Mark for check
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
  updateUser(): void {
    // Get the contact object
    const userData = this.userForm.value;

    // Update the contact on the server
    this._userService.updateContact(userData.id, userData).pipe(debounceTime(300)).subscribe(() => {
      this._router.navigate(['../', { relativeTo: this._activatedRoute }]);

      // Toggle the edit mode off
      this.toggleEditMode(false);
    });
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
        const id = this.user.id;

        // Delete the user
        this._userService.deleteContact(id).subscribe((isDeleted) => {
          // Return if the user wasn't deleted...
          if (!isDeleted) {
            return;
          } else {
            // Navigate to the parent view
            this._router.navigate(['../'], {
              relativeTo: this._activatedRoute,
            });
          }

          // Toggle the edit mode off
          this.toggleEditMode(false);
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }

}
