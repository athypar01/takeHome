export interface User {
  id: string;
  name: string;
  age: string;
  weight: string;
  friends: Friend[];
}

export interface Friend {
  id: string;
}
