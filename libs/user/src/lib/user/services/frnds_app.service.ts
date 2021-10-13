import { AddUser, DeleteUser, UpdateUser, UpsertUser } from './../+state/actions/frnds_select_user.actions';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, mergeMap, catchError } from 'rxjs/operators';

import { getAllUsers, getSelectedUser } from '../+state/selectors/frnds_app.selectors';
import { MockApiResponse, User } from '../types/frnds-app-state.interface';
import { SimpleDataModel } from '../components/charts/data.interface';
import { addNewUser } from '../+state/actions/frnds_new_user.actions';

@Injectable({
  providedIn: 'root'
})

export class FrndsAppService {
  public userList: User[] = [];
  private _user: BehaviorSubject<User | any> = new BehaviorSubject(null);
  private _users: BehaviorSubject<User[] | any> = new BehaviorSubject(null);
  public chartData: Array<any>;

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
            if (user.friends && user.friends.length > 0) {
              this.chartData = this.generateChartData(user.friends);
            } else {
              this.chartData = [];
            }
            user.chartData = this.chartData;
          } else {
            user.friends = [];
            user.chartData = [];
          }
        })
        this.userList = users;
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
        response.response.users.forEach(user => {
          if (user !== null && user?.friends && user.friends.length > 0) {
            const friends: User[] = [];
            user.friends.forEach((friend: User) => {
              this.userList?.forEach((userId: User) => {
                if (friend.id === userId.id) {
                  friends.push(userId)
                }
              })
            })
            user.friends = friends;
            if (user.friends && user.friends.length > 0) {
              this.chartData = this.generateChartData(user.friends);
            } else {
              this.chartData = [];
            }
            user.chartData = this.chartData;
          } else {
            user.friends = [];
            user.chartData = [];
          }
        })
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

          // Return the user
          return user;
        }),
        switchMap((user) => {
          if (!user) {
            return throwError('Could not find user with id of ' + id + '!');
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
        this._httpClient.post<User>('api/user/create', user).pipe(
          map((newUser: User) => {
            let data: Array<SimpleDataModel> = [];
            if (newUser && newUser.friends && newUser.friends.length !== 0) {
              data = this.generateChartData(newUser.friends);
            }

            // this.store.dispatch(new AddUser({user: newUser}))
            // Update the user list with the new user
            const updatedUserList = [...userList];
            console.log(updatedUserList)
            this.userList = updatedUserList;
            // Sort the contacts by the name field by default
            updatedUserList.sort((a, b) => a.name.localeCompare(b.name));
            // Return the new user
            return updatedUserList;
          }),
          catchError((res) => {
            return of(res)
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
      switchMap(() =>
        this._httpClient.patch<User>('api/user/update', { id, user })
          .pipe(
            map((user) => {
              if (user && user.friends && user.friends.length !== 0) {
                user.chartData = this.generateChartData(user.friends);
              }
              return user;
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
          .delete('api/user/delete', { params: { id } })
          .pipe(
            map((res: MockApiResponse | any) => {

              if (res.success) {
                // Find the index of the deleted contact
                const index = users.findIndex((item) => item.id === id);
                this.store.dispatch(new DeleteUser({ id: id }));
                // Delete the contact
                users.splice(index, 1);
              }
              return users;

            }),
            catchError((res: MockApiResponse) => {
              return of(res.response.users)
            })
          )
      )
    );
  }

  /**
   * Delete the contact
   *
   * @param rawData
   */
  generateChartData(rawData: User[]): Array<SimpleDataModel> {
    this.chartData = [];
    let children = 0;
    let youth = 0;
    let adults = 0;
    let seniors = 0;
    let total = 0;

    rawData.forEach((user: User) => {
      if (+user.age < 15) {
        children++;
      }

      if (+user.age >= 15 && +user.age < 25) {
        youth++;
      }

      if (+user.age >= 25 && +user.age < 65) {
        adults++;
      }

      if (+user.age >= 65) {
        seniors++;
      }
    })

    total = children + youth + adults + seniors;
    const friendsAgeData: SimpleDataModel[] = []

    if (children / total * 100 !== 0) {
      friendsAgeData.push({ name: "Children", value: (children / total * 100).toFixed(1), color: '#6773f1' });
    }

    if (youth / total * 100 !== 0) {
      friendsAgeData.push({ name: "Youth", value: (youth / total * 100).toFixed(1), color: '#32325d' });
    }

    if (adults / total * 100 !== 0) {
      friendsAgeData.push({ name: "Adults", value: (adults / total * 100).toFixed(1), color: '#6162b5' });
    }

    if (seniors / total * 100 !== 0) {
      friendsAgeData.push({ name: "Seniors", value: (seniors / total * 100).toFixed(1), color: '#6586f6' });
    }

    // this.store.dispatch(loadCharts());
    return friendsAgeData;
  }

}
