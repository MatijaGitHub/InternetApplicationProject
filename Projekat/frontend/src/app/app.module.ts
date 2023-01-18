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
import { UnregisteredUserComponent } from './unregistered-user/unregistered-user.component'

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
    UnregisteredUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
