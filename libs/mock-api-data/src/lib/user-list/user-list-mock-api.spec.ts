import { MockApiRequestsService } from '@secureworks/mockApiRequests';
import { UserListMockApi } from './user-list-mock-api';

describe('UserListMockApi', () => {
  it('should create an instance', () => {
    expect(new UserListMockApi(new MockApiRequestsService())).toBeTruthy();
  });
});
