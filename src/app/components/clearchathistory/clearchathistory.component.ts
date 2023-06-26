import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/app/classes/chat/chat';

@Component({
  selector: 'app-clearchathistory',
  templateUrl: './clearchathistory.component.html',
  styleUrls: ['./clearchathistory.component.scss']
})
export class ClearchathistoryComponent {
  constructor(
    public dialogRef: MatDialogRef<ClearchathistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public chat: Chat
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.dialogRef.close(true); // Pass true to indicate clear
  }
}
