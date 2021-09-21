/**
 * Interface for the 'User' data
 */
 export interface User {
  id: string;
  name: string;
  age: string;
  weight: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  friends: User[] | null;
}
