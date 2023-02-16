import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {

  constructor(private userService: UserService, private workshopService: WorkshopService,
    private router : Router) { }
  user_type : number | null = 2;
  users : User[] | null = []
  ngOnInit(): void {
    this.userService.getAllUsersRequest().subscribe((resp)=>{
      this.users = resp as User[];
    })
  }
  changePass(){
    this.router.navigate(['change-password']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  acceptRegister(user){
    this.userService.acceptRegistration(user.username).subscribe((resp)=>{
      this.userService.getAllUsersRequest().subscribe((resp2)=>{
        this.users = resp2 as User[];
      })
    });
  }

}
