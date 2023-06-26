import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.scss']
})
export class NewchatComponent {
  public chatName: string = '';
  public huggingfaceUrls: string[] = [''];

  constructor(
    private dialogRef: MatDialogRef<NewchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public addHuggingfaceUrlField() {
    this.huggingfaceUrls.push('');
  }

  public removeHuggingfaceUrlField(index: number) {
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
