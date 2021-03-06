import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import { ConfirmationService, ConfirmationModule } from '@secureworks/confirmation';
import { IconsModule } from '@secureworks/icons';
import { DetailsComponent } from './details.component';
import { ListComponent } from './../list/list.component';
import { FRNDS_APP_FEATURE_KEY, initReducer } from '../../+state/reducers/frnds_app_entity.reducer';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTooltipModule,
        IconsModule,
        ConfirmationModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(
          FRNDS_APP_FEATURE_KEY,
          initReducer
        )
      ],
      declarations: [ DetailsComponent ],
      providers: [
        ListComponent,
        ConfirmationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
