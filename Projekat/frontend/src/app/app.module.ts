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
    WorkshopInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
