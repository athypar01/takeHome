import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './+state/users.effects';

import { ConfirmationService } from '@secureworks/confirmation';
import { reducer, USERS_FEATURE_KEY } from './+state/users.reducer';
import { UserComponent } from './user.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { userRoutes } from './user.routing';
import { ChartsComponent } from '../charts/charts.component';


@NgModule({
  declarations: [
    UserComponent,
    DetailsComponent,
    ListComponent,
    ChartsComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    StoreModule.forFeature(USERS_FEATURE_KEY, reducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [
    ConfirmationService,
  ]
})
export class UserModule {}
