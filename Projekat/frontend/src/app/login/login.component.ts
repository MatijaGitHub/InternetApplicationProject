import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }
  username : string;
  password : string;
  message : string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user)=>{
      this.message = '';
      if(user.hasOwnProperty('message')){
        this.message = user['message'];
      }
      else{
          
          let userFromDB = user as User;
        if(userFromDB.type_of_user == 0){
          sessionStorage.setItem('username' , this.username);
          this.router.navigate(['user'])
        }
        else if(userFromDB.type_of_user == 1){
          this.router.navigate(['organizer'])
        }
        else{
          this.router.navigate(['admin'])
        }
      }
    });
  }
  switch_to_user_register(){
    this.router.navigate(['register', {is_user: 1}])
  }
  switch_to_organization_register(){
    this.router.navigate(['register', {is_user: 0}])
  }
  switch_to_forgot_password(){
    this.router.navigate(['forgot-password'])
  }

}
