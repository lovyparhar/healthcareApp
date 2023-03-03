import { Injectable } from '@angular/core';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private dialog : MatDialog
  ) { }

  displayOkDialog(dtitle: string, dmessage: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent,
      {
        data: { title: dtitle, message: dmessage, yesNoButtons: false, okButton: true },
        width: '40rem'
      }
    );

    return dialogRef.afterClosed();
  }

  displayError(err: HttpErrorResponse, ttle: string = '') {
    let title = !ttle ? 'Oops: Something Went Wrong !!' : ttle;

    let errorMessage = ""
    if (err.error && err.error.title && err.error.payload) {
      title = err.error.title;
      errorMessage = `${err.error.payload}`;

    } else {
      errorMessage = `${err.message}`;
    }

    title = `<div class="text-danger">${title}</div>`

    const message = `
      Status: ${JSON.stringify(err.status)}
      <br>
      Message: ${errorMessage}
    `;

    const dialogRef = this.dialog.open(InfoDialogComponent,
      {
        data: { title: title, message: message, yesNoButtons: false, okButton: true },
        width: '40rem'
      }
    );

    return dialogRef.afterClosed();
  }

  confirmationDialog(dtitle: string, dmessage: string) {
    const dialogRef = this.dialog.open(InfoDialogComponent,
      {
        data: { title: dtitle, message: dmessage, yesNoButtons: true, okButton: false },
        width: '40rem'
      }
    );

    return dialogRef.afterClosed().pipe(
      map((result: any) => {
        if(result && result.ynSelection && result.ynSelection === 1) {
          return "y";
        }
        else {
          return "n";
        }
      })
    );
  }
}
