import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Model } from 'src/app/classes/model/model';

@Component({
  selector: 'app-editchat',
  templateUrl: './editchat.component.html',
  styleUrls: ['./editchat.component.scss']
})
export class EditchatComponent {
  public chatName: string = '';
  public huggingfaceModels: Model[] = [new Model('')];

  constructor(
    public dialogRef: MatDialogRef<EditchatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.chatName = data.name;
    this.huggingfaceModels = data.huggingfaceModels;
  }

  addHuggingfaceUrlField(): void {
    this.huggingfaceModels.push(new Model(''));
  }

  removeHuggingfaceUrlField(index: number): void {
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
