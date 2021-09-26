import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FrndsAppService } from '../services/frnds_app.service';
import { UserByIdResolver, UserListResolver } from './user.resolver';

describe('UserListResolver', () => {
  let resolver: UserListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [FrndsAppService]
    });
    resolver = TestBed.inject(UserListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

describe('UserByIdResolver', () => {
  let resolver: UserByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [FrndsAppService]
    });
    resolver = TestBed.inject(UserByIdResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
