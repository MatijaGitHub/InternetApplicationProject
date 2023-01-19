import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { ForgotenPasswordComponent } from './forgoten-password/forgoten-password.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { RegisterComponent } from './register/register.component';
import { UnregisteredUserComponent } from './unregistered-user/unregistered-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:"" , component: LoginComponent},
  {path:"user", component: UserComponent},
  {path:"admin", component: AdminComponent},
  {path:"register", component: RegisterComponent},
  {path:"forgot-password", component: ForgotenPasswordComponent},
  {path:"organizer", component: OrganizerComponent},
  {path:"change-password", component: ChangePasswordComponent},
  {path:"unregistered-user", component: UnregisteredUserComponent},
  {path:"edit-comment", component: EditCommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
