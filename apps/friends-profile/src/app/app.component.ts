import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { tap } from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'secureworks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'friends-profile';

  constructor(private _httpClient: HttpClient) {
    this.getContacts();
  }

      /**
   * Get contacts
   */
  getContacts() {
    this._httpClient.get<any>('api/user/all').subscribe(x => console.log(x))
  }


}
