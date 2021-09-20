import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
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
  @ViewChild('tagsPanel') private _tagsPanel!: TemplateRef<any>;
  @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
  @ViewChild('mySelect') mySelect: MatSelect;

  user: User;
  selected: string;
  userForm: FormGroup;
  users: User[];
  friends: User[] = [];
  filteredUsers: User[] = [];
  editMode: boolean = false;
  private _tagsPanelOverlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _userListComponent: ListComponent,
    private _confirmationService: ConfirmationService,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    // Open the drawer
    this._userListComponent.matDrawer.open();

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
      .subscribe(async (friends: User[]) => {
        this.friends = await friends;
        // Clear the friends form arrays
        // (this.userForm.get('friends') as FormArray).clear();

        if (this.friends.length > 0) {
          // Iterate through them
          const name: string[] = [];
          const user: User[] = [];
          this.friends.forEach((friend: User) => {
            name.push(friend.name);
            user.push(friend)
          });
          this.userForm.get('friends')?.setValue(user);
          this.userForm.get('friendsNameList')?.setValue(name);
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
    // Dispose the overlays if they are still on the DOM
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  get friendsFormControl () {
    return this.userForm.get('friendsNameList') as FormControl;
  }

  public objectComparisonFunction = function( option:any, value: any ) : boolean {
    return option.id === value.id;
  }


  onUserSelection(event: any) {
    const names: string[] = []
    event.value.forEach((x: any) => {
      names.push(x.name)
    })
    this.userForm.get('friends')?.setValue(event.value);
    this.friendsFormControl?.setValue(names);
    this.friendsFormControl.updateValueAndValidity();
    this.userForm.updateValueAndValidity();
    console.log(this.userForm)
    this._changeDetectorRef.markForCheck();
  }
  /**
 * Open tags panel
 */
  openTagsPanel(): void {
    // Create the overlay
    this._tagsPanelOverlayRef = this._overlay.create({
      backdropClass: '',
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
        .withFlexibleDimensions(true)
        .withViewportMargin(64)
        .withLockedPosition(true)
        .withPositions([
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'center',
          },
        ]),
    });

    // Subscribe to the attachments observable
    this._tagsPanelOverlayRef.attachments().subscribe(() => {
      // Add a class to the origin
      this._renderer2.addClass(
        this._tagsPanelOrigin.nativeElement,
        'panel-opened'
      );
    });

    // Create a portal from the template
    const templatePortal = new TemplatePortal(
      this._tagsPanel,
      this._viewContainerRef
    );

    // Attach the portal to the overlay
    this._tagsPanelOverlayRef.attach(templatePortal);

    // Subscribe to the backdrop click
    this._tagsPanelOverlayRef.backdropClick().subscribe(() => {
      // Remove the class from the origin
      this._renderer2.removeClass(
        this._tagsPanelOrigin.nativeElement,
        'panel-opened'
      );

      // If overlay exists and attached...
      if (
        this._tagsPanelOverlayRef &&
        this._tagsPanelOverlayRef.hasAttached()
      ) {
        // Detach it
        this._tagsPanelOverlayRef.detach();
      }

      // If template portal exists and attached...
      if (templatePortal && templatePortal.isAttached) {
        // Detach it
        templatePortal.detach();
      }
    });

    this.filteredUsers = this.users;
    this.filteredUsers = this.filteredUsers.filter(x => x.id !== this.user.id)
  }

  /**
* Filter tags
*
* @param event
*/
  filterTags(event: any): void {
    // Get the value
    const value = event.target.value.toLowerCase();

    // Filter the tags
    this.filteredUsers = this.users.filter((tag) =>
      tag.name.toLowerCase().includes(value)
    );
    this.filteredUsers = this.filteredUsers.filter(x => x.id !== this.user.id)
    console.log(this.filteredUsers)
  }

  /**
 * Filter tags input key down event
 *
 * @param event
 */
  filterTagsInputKeyDown(event: any): void {
    // // Return if the pressed key is not 'Enter'
    // if (event.key !== 'Enter') {
    //   return;
    // }

    // // If there is no tag available...
    // if (this.filteredUsers.length === 0) {
    //   // Clear the input
    //   event.target.value = '';
    //   // Return
    //   return;
    // }

    // // If there is a tag...
    // const tag = this.filteredUsers[0];
    // const isTagApplied = this.users.find((id) => id.name === tag.name);

    // // If the found tag is already applied to the User...
    // if (isTagApplied) {
    //   // Remove the tag from the contact
    //   this.removeTagFromContact(tag);
    // } else {
    //   // Otherwise add the tag to the contact
    //   this.addTagToContact(tag);
    // }
  }

  /**
* Add tag to the contact
*
* @param tag
*/
  addTagToContact(tag: User): void {
    // // Add the tag
    // this.user.friends.push(tag.id);
    // // Update the contact form
    // const friendFormArrayGroup = this.userForm.get('friends') as FormArray;

    // // friendFormArrayGroup.get('friends').patchValue(tag.id);

    // // Mark for check
    // this._changeDetectorRef.markForCheck();
  }

  /**
   * Remove tag from the contact
   *
   * @param tag
   */
  removeTagFromContact(tag: User): void {
    // Remove the tag
    // this.user.friends.splice(
    //   this.user.friends.findIndex((item) => item === tag.id),
    //   1
    // );

    // Update the contact form
    // this.contactForm.get('tags').patchValue(this.contact.tags);

    // Mark for check
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
    this._userService.updateContact(userData.id, userData).pipe(debounceTime(300)).subscribe(async (res) => {
      await res;
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

        // Get the next/previous user id
        const currentUserIndex = this.users.findIndex(
          (item) => item.id === id
        );
        const nextUserIndex =
          currentUserIndex +
          (currentUserIndex === this.users.length - 1 ? -1 : 1);
        const nextUserId =
          this.users.length === 1 && this.users[0].id === id
            ? null
            : this.users[nextUserIndex].id;

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
