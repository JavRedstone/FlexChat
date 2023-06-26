import { Component, ViewChild, ElementRef } from '@angular/core';
import { Chat } from 'src/app/classes/chat/chat';
import { NewchatComponent } from '../newchat/newchat.component';
import { ChatService } from 'src/app/services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Message } from 'src/app/classes/message/message';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditchatComponent } from '../editchat/editchat.component';
import { DeletechatComponent } from '../deletechat/deletechat.component';
import { ClearallconversationsComponent } from '../clearallconversations/clearallconversations.component';
import { ClearchathistoryComponent } from '../clearchathistory/clearchathistory.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef<HTMLDivElement>;
  public chats: Chat[] = [];
  public selectedChat: Chat | null = null;
  public selectedModelUrl: string = '';
  public darkMode = false;
  public env = environment;

  constructor(
    private chatService: ChatService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadChatsFromLocalStorage();
    this.loadThemeFromLocalStorage();
    setInterval(() => {
      this.saveChatsToLocalStorage();
    }, 500);
  }

  public newChat() {
    const dialogRef = this.dialog.open(NewchatComponent, {
      width: environment.DIALOG_WIDTH
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        let res = await this.setHuggingFaceParams(result.name, result.huggingfaceUrls);
        if (res.huggingfaceUrls.length > 0) {
          this.chats.push(new Chat(res.name, res.huggingfaceUrls));
          this.selectedChat = this.chats[this.chats.length - 1];
          this.selectedModelUrl = result.huggingfaceUrls[0];
        }
      }
    });
  }

  public clearChats() {
    const dialogRef = this.dialog.open(ClearallconversationsComponent, {
      width: environment.DIALOG_WIDTH
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result == true) {
        this.chats = [];
        this.selectedChat = null;
      }
    });
  }

  public editChat(chat: Chat) {
    const dialogRef = this.dialog.open(EditchatComponent, {
      width: environment.DIALOG_WIDTH,
      data: chat
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        let res = await this.setHuggingFaceParams(result.name, result.huggingfaceUrls);
        if (res.huggingfaceUrls.length > 0) {
          chat.name = res.name;
          chat.huggingfaceUrls = res.huggingfaceUrls;
        }
        else {
          const index = this.chats.indexOf(chat);
          if (index !== -1) {
            this.chats.splice(index, 1);
            if (this.selectedChat === chat) {
              this.selectedChat = null;
            }
          }
        }
      }
    });
  }

  public async setHuggingFaceParams(name: string, huggingfaceUrls: string[]) {
    if (name.trim().length === 0) {
      name = 'Untitled Chat';
    }
    for (let i = 0; i < huggingfaceUrls.length; i++) {
        if (huggingfaceUrls[i].trim().length === 0) {
            huggingfaceUrls.splice(i, 1);
        }
        try {
          let response: any = await lastValueFrom(this.chatService.doGet(huggingfaceUrls[i]));
          if (response) {
            if (response.pipeline_tag == 'private') {
              this.snackBar.open('Error: Model is private.', 'Close', { duration: 2000 });
              huggingfaceUrls.splice(i, 1);
            }
            else if (response.pipeline_tag != 'conversational') {
              this.snackBar.open('Error: Model is not conversational.', 'Close', { duration: 2000 });
              huggingfaceUrls.splice(i, 1);
            }
          }
        }
        catch (error: any) {
          this.snackBar.open('Error:  ' + error.error.error, 'Close', { duration: 2000 });
          huggingfaceUrls.splice(i, 1);
        }
    }
    // if (huggingfaceUrls.length == 0) {
    //   this.snackBar.open('Error: Chat urls are all invalid', 'Close', { duration: 2000 });
    // }
    return {
      name: name,
      huggingfaceUrls: huggingfaceUrls
    }
  }

  public deleteChat(chat: Chat) {
    const dialogRef = this.dialog.open(DeletechatComponent, {
      width: environment.DIALOG_WIDTH,
      data: chat
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result == true) {
        const index = this.chats.indexOf(chat);
        if (index !== -1) {
          this.chats.splice(index, 1);
          if (this.selectedChat === chat) {
            this.selectedChat = null;
          }
        }
      }
    });
  }

  public clearChat(chat: Chat) {
    const dialogRef = this.dialog.open(ClearchathistoryComponent, {
      width: environment.DIALOG_WIDTH,
      data: chat
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result == true) {
        chat.messages = [];
      }
    });
  }

  public async sendMessage(message: string, sent: boolean = false) {
    let currentChat = this.selectedChat;
    if (currentChat != null && !currentChat.isLoading && message.trim().length > 0) {
      currentChat.messages.push(new Message(message, false, false, ''));
      this.scrollToBottom();
      for (let i = 0; i < currentChat.huggingfaceUrls.length; i++) {
        try {
          currentChat.isLoading = true;
          let response: any = await lastValueFrom(this.chatService.doPost(currentChat.huggingfaceUrls[i], message));
          if (response) {
            currentChat.messages.push(new Message(response.generated_text, true, false, currentChat.huggingfaceUrls[i]));
          } else {
            // Handle error case when response is empty or invalid
            currentChat.messages.push(new Message('Error: Invalid response', true, true, currentChat.huggingfaceUrls[i]));
          }
        } catch (error: any) {
          // Handle error case (error.error.error) yes it is weird
          let err = null;
          if (error.error == null) {
            err = error.message;
          }
          else {
            err = error.error.error;
          }
          currentChat?.messages.push(new Message('Error: ' + err, true, true, currentChat.huggingfaceUrls[i]));
        }
        currentChat.isLoading = false;

        if (currentChat.messages.length > environment.MAX_MESSAGES_AMOUNT) {
          const messagesToRemove = currentChat.messages.length - environment.MAX_MESSAGES_AMOUNT;

          // Remove the excess messages from the beginning of the array
          currentChat.messages.splice(0, messagesToRemove);
        }
        this.scrollToBottom();
      }
    }
  }

  public scrollToBottom(): void {
    // Need to wait for html to update before scrolling
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    });
  }

  public copyUrlToClipboard() {
    const API_URL = this.env.API_URL;
    const huggingfaceUrl = this.selectedModelUrl;
    const fullUrl = API_URL + huggingfaceUrl;
    if (huggingfaceUrl.trim().length > 0) {
      navigator.clipboard.writeText(fullUrl)
        .then(() => {
          this.snackBar.open('API Inference URL successfully copied to clipboard', 'Close', { duration: 2000 });
        })
        .catch((error) => {
          this.snackBar.open('Error: Failed to copy API Inference URL to clipboard', 'Close', { duration: 2000 });
        });
    }
    else {
      this.snackBar.open('No API Inference URL was selected', 'Close', { duration: 2000 });
    }
  }

  public downloadChat(chat: Chat) {
    const filename = `${chat.name}_FlexChat.json`;
    const jsonContent = JSON.stringify(chat);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonContent));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  public downloadMessages(chat: Chat) {
    const filename = `${chat.name}_messages_FlexChat.json`;
    const jsonContent = JSON.stringify(chat.messages);

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonContent));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  private saveChatsToLocalStorage() {
    const chatsData = JSON.stringify(this.chats);
    localStorage.setItem('chats', chatsData);
  }

  private loadChatsFromLocalStorage(): void {
    const chatsData = localStorage.getItem('chats');
    if (chatsData) {
      this.chats = JSON.parse(chatsData);
      for (let chat of this.chats) {
        chat.isLoading = false;
      }
    }
  }

  public toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    this.saveThemeToLocalStorage();
  }

  private applyTheme() {
    const body = document.getElementsByTagName('body')[0];
    if (this.darkMode) {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }

  private saveThemeToLocalStorage() {
    const theme = this.darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  private loadThemeFromLocalStorage() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.darkMode = theme === 'dark';
      this.applyTheme();
    }
  }
}
