import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BecomeOrganizatorComponent } from './become-organizator/become-organizator.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChatComponent } from './chat/chat.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { EditWorkshopComponent } from './edit-workshop/edit-workshop.component';
import { ForgotenPasswordComponent } from './forgoten-password/forgoten-password.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UnregisteredUserComponent } from './unregistered-user/unregistered-user.component';
import { UserWorkshopsComponent } from './user-workshops/user-workshops.component';
import { UserComponent } from './user/user.component';
import { WorkshopInfoComponent } from './workshop-info/workshop-info.component';
import { WorkshopMessagesComponent } from './workshop-messages/workshop-messages.component';

const routes: Routes = [
  {path:"" , component: LoginComponent},
  {path:"user", component: UserComponent},
  {path:"admin", component: AdminComponent},
  {path:"register", component: RegisterComponent},
  {path:"forgot-password", component: ForgotenPasswordComponent},
  {path:"organizer", component: OrganizerComponent},
  {path:"change-password", component: ChangePasswordComponent},
  {path:"unregistered-user", component: UnregisteredUserComponent},
  {path:"edit-comment", component: EditCommentComponent},
  {path:"workshop-info", component: WorkshopInfoComponent},
  {path:"user-chat", component: ChatComponent},
  {path: "user-info", component: ProfileComponent},
  {path: "user-workshops", component:UserWorkshopsComponent},
  {path: "become-organizer", component:BecomeOrganizatorComponent},
  {path: "sidebar-component", component:SidebarComponent},
  {path:"workshop-messages", component:WorkshopMessagesComponent},
  {path:"edit-workshop", component: EditWorkshopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
