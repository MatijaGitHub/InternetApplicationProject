import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ForgotenPasswordComponent } from './forgoten-password/forgoten-password.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UnregisteredUserComponent } from './unregistered-user/unregistered-user.component';
import { ProfileComponent } from './profile/profile.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { UserWorkshopsComponent } from './user-workshops/user-workshops.component';
import { WorkshopInfoComponent } from './workshop-info/workshop-info.component'
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ChatComponent } from './chat/chat.component';
import { BecomeOrganizatorComponent } from './become-organizator/become-organizator.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkshopMessagesComponent } from './workshop-messages/workshop-messages.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { RegistrationRequestsComponent } from './registration-requests/registration-requests.component';
import { InsertNewUserComponent } from './insert-new-user/insert-new-user.component';
import { WorkshopAproveComponent } from './workshop-aprove/workshop-aprove.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    RegisterComponent,
    ForgotenPasswordComponent,
    OrganizerComponent,
    ChangePasswordComponent,
    UnregisteredUserComponent,
    ProfileComponent,
    EditCommentComponent,
    UserWorkshopsComponent,
    WorkshopInfoComponent,
    ChatComponent,
    BecomeOrganizatorComponent,
    SidebarComponent,
    WorkshopMessagesComponent,
    EditWorkshopComponent,
    ViewApplicationsComponent,
    EditUsersComponent,
    RegistrationRequestsComponent,
    InsertNewUserComponent,
    WorkshopAproveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
