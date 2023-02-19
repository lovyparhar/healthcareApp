import { Injectable } from '@angular/core';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of } from 'rxjs';

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
