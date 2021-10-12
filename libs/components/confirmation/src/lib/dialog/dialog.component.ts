import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConfirmationConfig } from '../confirmation.types';

@Component({
  selector: 'secureworks-dialog',
  templateUrl: './dialog.component.html',
  styles: [
    `
      .secureworks-confirmation-dialog-panel {
        @screen md {
          @apply w-128;
        }

        .mat-dialog-container {
          padding: 0 !important;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})

export class DialogComponent {

  /**
   * Constructor
   */
   constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationConfig,
    public matDialogRef: MatDialogRef<DialogComponent>
  ) {}
}
