import { HttpErrorResponse } from '@angular/common/http';
import { EntityState } from "@ngrx/entity";

import { FRNDS_APP_FEATURE_KEY } from "../+state/reducers/frnds_app_init.reducer";

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
}

export interface Update<T> {
  id: string;
  changes: Partial<T>;
}

export interface FrndsAppStateInterface extends EntityState<User> {
  validationErrors: any;
  editToggleStatus: boolean;
  isSubmitting: boolean | null;
  isNew:boolean | null;
  loaded: boolean | null;
  users?: User[] | null;
  user?: User;
  error?: HttpErrorResponse | null;
  selectedId?: string | null;
  queryParam?: string | null;
}
