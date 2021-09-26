import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FrndsAppService } from './frnds_app.service';

describe('FrndsAppService', () => {
  let service: FrndsAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FrndsAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
