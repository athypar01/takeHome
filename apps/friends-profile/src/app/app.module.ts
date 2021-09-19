import { IconsShareableModule } from '@secureworks/icons';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MockApiRequestsModule } from '@secureworks/mockApiRequests';
import { mockApiDataServices } from '@secureworks/apiMockData';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import { environment } from '@secureworks/shared/environments';
import { DataPersistence } from '@nrwl/angular';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MockApiRequestsModule.forRoot(mockApiDataServices),
    IconsShareableModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
