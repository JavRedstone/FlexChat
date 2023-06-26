import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clearallconversations',
  templateUrl: './clearallconversations.component.html',
  styleUrls: ['./clearallconversations.component.scss']
})
export class ClearallconversationsComponent {
  constructor(
    public dialogRef: MatDialogRef<ClearallconversationsComponent>
  ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  clear(): void {
    this.dialogRef.close(true); // Pass true to indicate clear
  }
}
