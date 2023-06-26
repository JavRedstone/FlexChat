import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editchat',
  templateUrl: './editchat.component.html',
  styleUrls: ['./editchat.component.scss']
})
export class EditchatComponent {
  public chatName: string = '';
  public huggingfaceUrls: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chatName = data.name;
    this.huggingfaceUrls = data.huggingfaceUrls;
  }

  addHuggingfaceUrlField(): void {
    this.huggingfaceUrls.push('');
  }

  removeHuggingfaceUrlField(index: number): void {
    this.huggingfaceUrls.splice(index, 1);
  }

  public saveChat() {
    const chatData = {
      name: this.chatName.trim(),
      huggingfaceUrls: this.huggingfaceUrls.filter(url => url.trim() !== '')
    };
    this.dialogRef.close(chatData);
  }

  public cancel() {
    this.dialogRef.close();
  }

  public trackByFn(index: any, item: any) {
    return index;  
  }
}
