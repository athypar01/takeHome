import { TestBed } from '@angular/core/testing';
import { MockApiRequestsService } from './mock-api-requests.service';

describe('MockApiRequestService', () => {
  let service: MockApiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockApiRequestsService);
  });

  it('MockApiRquestsService should be created', () => {
    expect(service).toBeTruthy();
  });
});
