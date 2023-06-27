import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/classes/model/model';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.scss']
})
export class NewchatComponent {
  public chatName: string = '';
  public huggingfaceModels: Model[] = [new Model('')];

  constructor(
    private dialogRef: MatDialogRef<NewchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public addHuggingfaceUrlField() {
    this.huggingfaceModels.push(new Model(''));
  }

  public removeHuggingfaceUrlField(index: number) {
    this.huggingfaceModels.splice(index, 1);
  }

  public saveChat() {
    const chatData = {
      name: this.chatName.trim(),
      huggingfaceModels: this.huggingfaceModels
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
