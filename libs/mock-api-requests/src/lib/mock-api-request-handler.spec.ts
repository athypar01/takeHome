import { MockApiRequestHandler } from './mock-api-request-handler';

describe('MockApiRequestHandler', () => {
  it('should create an instance', () => {
    expect(new MockApiRequestHandler('')).toBeTruthy();
  });
});
