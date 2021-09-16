import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedDataAccessModule } from '@secureworks/shared/data-access';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SharedDataAccessModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
