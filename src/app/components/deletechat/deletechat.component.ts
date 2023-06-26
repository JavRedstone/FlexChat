import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chat } from 'src/app/classes/chat/chat';

@Component({
  selector: 'app-deletechat',
  templateUrl: './deletechat.component.html',
  styleUrls: ['./deletechat.component.scss']
})
export class DeletechatComponent {
  constructor(
    public dialogRef: MatDialogRef<DeletechatComponent>,
    @Inject(MAT_DIALOG_DATA) public chat: Chat
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  del(): void {
    this.dialogRef.close(true); // Pass true to indicate deletion
  }
}
