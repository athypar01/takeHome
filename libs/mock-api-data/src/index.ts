import { MockApiResponse, MockApiResponseMainBody, User } from "./lib/user-list/types/response.interface";
import { UserListMockApi } from "./lib/user-list/user-list-mock-api";

export const mockApiDataServices = [
  UserListMockApi,
  MockApiResponse,
  MockApiResponseMainBody,
  User
];
