import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MockApiRequestsModule } from '@secureworks/mockApiRequests';
import { mockApiDataServices } from '@secureworks/apiMockData';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MockApiRequestsModule.forRoot(mockApiDataServices),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
