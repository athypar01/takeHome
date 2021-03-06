/* eslint-disable @typescript-eslint/no-explicit-any */
import { assign, cloneDeep } from 'lodash-es';
import { Injectable } from '@angular/core';

import { MockApiResponse, MockApiResponseMainBody } from './../../../../user/src/lib/user/types/frnds_app_state.interface';
import { MockApiRequestsService } from '@secureworks/mockApiRequests';
import { userList as userData } from './data';

@Injectable({
  providedIn: 'root',
})
export class UserListMockApi {
  response: MockApiResponse = new MockApiResponse();
  private _userList: any[] = userData;

  /**
   * Constructor
   */
  constructor(private _mockApiService: MockApiRequestsService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ User - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/user/all')
      .reply(() => {
        // Clone the user list
        const userList = cloneDeep(this._userList);

        // Sort the contacts by the name field by default
        userList.sort((a, b) => a.name.localeCompare(b.name));

        this.response.success = true;
        this.response.response = new MockApiResponseMainBody();
        this.response.response.users = userList;

        // Return the response
        return [200, this.response];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ User Search - GET
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/user/search')
      .reply(({ request }) => {
        // Get the search query
        const query = request.params.get('query');

        // Clone the contacts
        let users = cloneDeep(this._userList);

        // If the query exists...
        if (query) {
          // Filter the contacts
          users = users.filter(
            (user) =>
              user.name &&
              user.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Sort the contacts by the name field by default
        users.sort((a, b) => a.name.localeCompare(b.name));

        this.response.success = true;
        this.response.response = new MockApiResponseMainBody();
        this.response.response.users = users;

        // Return the response
        return [200, users];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ User - GET by ID
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onGet('api/user/getUserById')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the users
        const users = cloneDeep(this._userList);

        // Find the user
        this.response.success = true;
        this.response.response = new MockApiResponseMainBody();
        this.response.response.users = users.find((item) => item.id === id);

        // Return the response
        return [200, this.response];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ User - POST
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService.onPost('api/user/create').reply(({request}) => {
      // Generate a new contact
      const newUser = request.body

      // Unshift the new contact
      this._userList.unshift(newUser);

      this.response.success = true;
      this.response.response = new MockApiResponseMainBody();
      this.response.response.users = this._userList;

      // Return the response
      return [200, newUser];
    });

    // -----------------------------------------------------------------------------------------------------
    // @ User - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onPatch('api/user/update')
      .reply(({ request }) => {
        // Get the id and contact
        const id = request.body.id;
        const userList = cloneDeep(request.body.user);

        // Prepare the updated contact
        let updatedUser = null;

        // Find the contact and update it
        this._userList.forEach((item, index, user) => {
          if (item.id === id) {
            // Update the contact
            user[index] = assign({}, user[index], userList);

            // Store the updated contact
            updatedUser = user[index];
          }
        });

        // Return the response
        return [200, updatedUser];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ User - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._mockApiService
      .onDelete('api/user/delete')
      .reply(({ request }) => {
        // Get the id
        const id = request.params.get('id');

        // Find the contact and delete it
        this._userList.forEach((item, index) => {
          if (item.id === id) {
            this._userList.splice(index, 1);
          }
        });

        // Return the response
        return [200, true];
      });
  }
}
