import { TestBed } from '@angular/core/testing';
import { MockApiRequestsInterceptor } from './mock-api-requests.interceptor';

describe('MockApiRequestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockApiRequestsInterceptor
    ]
  }));

  it('MockApiRequestInterceptor should be created', () => {
    const interceptor: MockApiRequestsInterceptor = TestBed.inject(MockApiRequestsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
