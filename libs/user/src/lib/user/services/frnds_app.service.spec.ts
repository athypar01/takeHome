import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { ConfirmationModule, ConfirmationService } from '@secureworks/confirmation';
import { IconsShareableModule } from '@secureworks/icons';
import { MockApiRequestsModule } from '@secureworks/mockApiRequests';
import { FRNDS_APP_FEATURE_KEY, initReducer } from '../+state/reducers/frnds_app_init.reducer';
import { ListComponent } from '../components/list/list.component';
import { FrndsAppService } from './frnds_app.service';

describe('FrndsAppService', () => {
  let service: FrndsAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSidenavModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MockApiRequestsModule.forRoot([]),
        IconsShareableModule.forRoot(),
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        ConfirmationModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          FRNDS_APP_FEATURE_KEY,
          initReducer
        )
      ],
      declarations: [ ListComponent ],
      providers: [
        ConfirmationService,
        Store,
      ]
    });
    service = TestBed.inject(FrndsAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
