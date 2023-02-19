import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent implements OnInit {

  outputData: any = {};

  constructor(public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  // Function for yes/no selection in confirmation cases
  ynSelected(selection: number): void {
    this.outputData.ynSelection = selection;
    this.dialogRef.close(this.outputData);
  }
  
  okSelected(): void {
    this.dialogRef.close();
  }
}
