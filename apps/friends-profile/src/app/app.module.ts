import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { MockApiRequestsModule } from '@secureworks/mockApiRequests';
import { mockApiDataServices } from '@secureworks/apiMockData';
import { IconsShareableModule } from '@secureworks/icons';
import { environment } from '@secureworks/shared/environments';
import { FrndsAppModule } from '@secureworks/frnds-app';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MockApiRequestsModule.forRoot(mockApiDataServices),
    IconsShareableModule.forRoot(),
    FrndsAppModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [
    {
      // Use the 'fill' appearance on Angular Material form fields by default
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'fill',
      },
    },
    DataPersistence],
  bootstrap: [AppComponent],
})
export class AppModule {}
