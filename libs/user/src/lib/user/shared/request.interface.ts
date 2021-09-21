import { User } from "./users.interface";

/**
 * Interface for the 'Requests'
 */
export interface GetRequestsInterface {
  url: string;
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
