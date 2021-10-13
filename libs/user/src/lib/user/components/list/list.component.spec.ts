import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';

import { ConfirmationModule, ConfirmationService } from '@secureworks/confirmation';
import { MockApiRequestsModule } from '@secureworks/mockApiRequests';
import { ListComponent } from './list.component';
import { FRNDS_APP_FEATURE_KEY, initReducer } from '../../+state/reducers/frnds_app_init.reducer';
import { IconsShareableModule } from '@secureworks/icons';
import { MatButtonModule } from '@angular/material/button';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function mockApiDataServices(mockApiDataServices: any): any {
  throw new Error('Function not implemented.');
}

