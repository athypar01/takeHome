import { Component, Input, OnInit } from '@angular/core';

import { BackendErrorsInterface } from './../../types/backendErrors.interface';

@Component({
  selector: 'error-messages',
  templateUrl: './error-messages.component.html',
})

export class ErrorMessagesComponent implements OnInit {

  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface

  errorMessages: string[]

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrorsProps).map(
      (name: string) => {
        const messages = this.backendErrorsProps[name].join(' ')
        return `${name} ${messages}`
      }
    )
  }

}
