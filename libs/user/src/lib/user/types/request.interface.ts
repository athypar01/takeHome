import { User } from "./frnds-app-state.interface";

/**
 * Interface for the 'Requests'
 */
export interface QueryInterface {
  queryParam?: string;
}

export interface GetRequestsInterface {
  id?: string;
  queryParam?: string;
}

export interface CreateUserRequestInterface {
  user: {
    id: string;
    age: string;
    weight: string;
    friends?: User[] | null;
  }
}

export interface UpdateUserRequestInterface {
  id: string,
  user: {
    id: string;
    age: string;
    weight: string;
    friends?: User[] | null;
  }
}

export interface DeleteUserRequestsInterface {
  id: string;
}

export interface QueryResponseInterface {
  users: User[]
}
