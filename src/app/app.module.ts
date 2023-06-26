import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MaterialModule } from './modules/material.module';
import { CdkModule } from './modules/cdk.module';
import { NewchatComponent } from './components/newchat/newchat.component';
import { EditchatComponent } from './components/editchat/editchat.component';
import { DeletechatComponent } from './components/deletechat/deletechat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClearchathistoryComponent } from './components/clearchathistory/clearchathistory.component';
import { ClearallconversationsComponent } from './components/clearallconversations/clearallconversations.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NewchatComponent,
    EditchatComponent,
    DeletechatComponent,
    ClearchathistoryComponent,
    ClearallconversationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    CdkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
