import { DeleteUser } from './../+state/actions/frnds_select_user.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap, mergeMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { AddUser } from '../+state/actions/frnds_select_user.actions';

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
      }),
      mergeMap(users => {
        users.forEach(user => {
          if (user !== null && user?.friends && user.friends.length > 0) {
            const friends: User[] = [];
            user.friends.forEach((friend: User) => {
              users?.forEach((userId: User) => {
                if (friend.id === userId.id) {
                  friends.push(userId)
                }
              })
            })
            user.friends = friends;
          } else {
            user.friends = [];
          }
        })
        return of(users)
      }),
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
          // Update the user
          this._user.next(user);

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
      return of(null)
    }
  }

  /**
   * Create user
   */
  createUser(user: User): Observable<User[]> {
    return this.users$.pipe(
      take(1),
      switchMap((userList) =>
        this._httpClient.post<User>('api/user/contact', user).pipe(
          map((newUser) => {
            this.store.dispatch(new AddUser({user: newUser}));
            const updatedUserList = [newUser, ...userList];
            // Sort the contacts by the name field by default
            updatedUserList.sort((a, b) => a.name.localeCompare(b.name));
            // Update the user list with the new user
            // Return the new user
            return updatedUserList;
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
    return this.users$.pipe(
      take(1),
      switchMap((users) =>
        this._httpClient.patch<User>('api/user/contact', { id, user })
          .pipe(
            map((user) => {
              // Find the index of the updated contact
              const index = users.findIndex((item) => item.id === id);

              // Update the contact
              users[index] = user;

              // Update the users
              this._users.next(users);

              // Return the updated contact
              return users[index];
            })
          ))
    );
  }

  /**
   * Delete the contact
   *
   * @param id
   */
  deleteContact(id: string): Observable<User[]> {
    return this.users$.pipe(
      take(1),
      switchMap((users: User[]) =>
        this._httpClient
          .delete('api/user/contact', { params: { id } })
          .pipe(
            map(() => {

              // Find the index of the deleted contact
              const index = users.findIndex((item) => item.id === id);

              this.store.dispatch(new DeleteUser({id: id}));

              // Delete the contact
              users.splice(index, 1);

              // Update the users
              this._users.next(users);

              // Return the deleted status
              return users;
            })
          )
      )
    );
  }

}
