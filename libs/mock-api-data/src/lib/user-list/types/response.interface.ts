import { HttpErrorResponse } from "@angular/common/http";

export class MockApiResponse {
  success: boolean;
  response: MockApiResponseMainBody;
  errors: HttpErrorResponse | null;
}

export class MockApiResponseMainBody {
  users: User[]
}

export class User {
  id: string;
  name: string;
  age: string;
  weight: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  friends: {
    id: string;
    name?: string;
    age?: string;
    weight?: string;
    createdAt?: string | null;
    updatedAt?: string | null;
  }[];
}
