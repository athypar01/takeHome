import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { getAllUsers, getSelectedUser } from '../+state/selectors/frnds_app.selectors';

import { MockApiResponse, User } from '../types/frnds-app-state.interface';

@Injectable({
  providedIn: 'root'
})

export class FrndsAppService {
  private _user: BehaviorSubject<User | any> = new BehaviorSubject(null);
  private _users: BehaviorSubject<User[] | any> = new BehaviorSubject(null);
  private _friends: BehaviorSubject<User[] | any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private store: Store
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for user list
   */
  get users$(): Observable<User[]> {
    return this.store.select(getAllUsers);
  }

  /**
 * Getter for user
 */
  get user$(): Observable<any> {
    return this.store.select(getSelectedUser);
  }

  /**
 * Getter for friends of selected user
 */
  get friend$(): Observable<User[]> {
    return this._friends.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  getAllUsers(response: User[]): User[] {
    return response
  }

  /**
   * Get user list
   */
  getUserList(): Observable<User[]> {
    return this._httpClient.get<MockApiResponse>('api/user/all').pipe(
      map((response: MockApiResponse) => {
        return response.response.users
      })
    );
  }

  /**
   * Search user with given query
   *
   * @param query
   */
  searchUsers(query: string): Observable<User[]> {
    return this._httpClient.get<MockApiResponse>('api/user/search', { params: { query } }).pipe(
      map((response: MockApiResponse) => {
        return response.response.users
      })
    );
  }

  /**
   * Get user by id
   */
  getUserById(id: string | null): Observable<User | null> {
    if (id !== null && id !== undefined && id !== 'new') {
      return this.users$?.pipe(
        take(1),
        map((users) => {
          // Find the user
          const user = users.find((item: User) => item.id === id);
          const friends: User[] = [];
          user?.friends?.forEach((friend: User) => {
            users.forEach((userId: User) => {
              if (friend.id === userId.id) {
                friends.push(userId)
              }
            })
          })

          // Update the user
          this._user.next(user);

          // Update the friends
          this._friends.next(friends);

          // Return the user
          return user;
        }),
        switchMap((user) => {
          if (!user) {
            return throwError('Could not found user with id of ' + id + '!');
          }

          return of(user);
        })
      );
    } else {
      this._user.next(null);
      return of(null);
    }
  }

  /**
   * Create user
   */
  createUser(): Observable<User> {
    return this.users$.pipe(
      take(1),
      switchMap((userList) =>
        this._httpClient.post<User>('api/user/contact', {}).pipe(
          map((newUser) => {
            // Update the user list with the new user
            this._users.next([newUser, ...userList]);

            // Return the new user
            return newUser;
          })
        )
      )
    );
  }

  /**
   * Update User
   *
   * @param id
   * @param user
   */
  updateContact(id: string, user: User): Observable<User> {
    this.user$.subscribe(x => console.log(x))
    return this.users$.pipe(
      take(1),
      switchMap((users) =>
        this._httpClient
          .patch<User>('api/user/contact', {
            id,
            user,
          })
          .pipe(
            map((updatedUser) => {
              // Find the index of the updated contact
              const index = users.findIndex((item) => item.id === id);
              console.log(index)

              // Update the contact
              users[index] = updatedUser;

              // Update the users
              this._users.next(users);

              // Return the updated contact
              return updatedUser;
            }),
            switchMap((updatedUser) =>
              this.user$.pipe(
                take(1),
                filter((item) => item && item.id === id),
                tap(() => {
                  // Update the user if it's selected
                  this._user.next(updatedUser);

                  // Return the updated user
                  return updatedUser;
                })
              )
            )
          )
      )
    );
  }

  /**
   * Delete the contact
   *
   * @param id
   */
  deleteContact(id: string): Observable<boolean> {
    return this.users$.pipe(
      take(1),
      switchMap((users: User[]) =>
        this._httpClient
          .delete('api/user/contact', { params: { id } })
          .pipe(
            map((isDeleted: boolean | any) => {

              // Find the index of the deleted contact
              const index = users.findIndex((item) => item.id === id);

              // Delete the contact
              users.splice(index, 1);

              // Update the users
              this._users.next(users);

              // Return the deleted status
              return isDeleted;
            })
          )
      )
    );
  }

}
