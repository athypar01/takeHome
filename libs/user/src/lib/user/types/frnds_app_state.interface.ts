import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from "@ngrx/entity";

import { FRNDS_APP_FEATURE_KEY } from '../+state/reducers/frnds_app_entity.reducer';

/**
 * Interface for the 'User' data
 */
export interface FrndsPartialState {
  readonly [FRNDS_APP_FEATURE_KEY]: FrndsAppStateInterface;
}

export class MockApiResponse {
  success: boolean;
  response: MockApiResponseMainBody;
  errors: HttpErrorResponse | null;
}

export class MockApiResponseMainBody {
  users: User[]
}

export interface QueryUser {
  param?: string[];
}

export interface User {
  id: string;
  name: string;
  age: string;
  weight: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  friends: User[] | null;
  chartData: Array<SimpleDataModel>
}

export class User {
  id = '';
  name = '';
  age = '';
  weight = '';
  friends: User[] | null = [];
  chartData: Array<SimpleDataModel> = [];
}

export interface Update<User> {
  id: string;
  changes: Partial<User>;
}

export interface FrndsAppStateInterface extends EntityState<User> {
  isNew:boolean;
  loaded: boolean;
  editToggleStatus: boolean;
  isSubmitting: boolean;
  queryParam?: string | null;
  selectedUserId?: string | null;
  error?: HttpErrorResponse | null;
  users?: User[]
}

export interface SimpleDataModel {
  name: string;
  value: string;
  color?: string;
}
