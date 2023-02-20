import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
          // sessionStorage.setItem('username' , this.username);
          // sessionStorage.setItem('firstname' , userFromDB.firstname);
          // sessionStorage.setItem('lastname' , userFromDB.lastname);
          // sessionStorage.setItem('email', userFromDB.email);
          // sessionStorage.setItem('phonenumber' , userFromDB.phonenumber);
          // sessionStorage.setItem('imagePath', userFromDB.image_path);
          // sessionStorage.setItem('user_type', "0");
          // this.router.navigate(['user'])
          this.message = "Login only for admins!"
        }
        else if(userFromDB.type_of_user == 1){
          // sessionStorage.setItem('username' , this.username);
          // sessionStorage.setItem('firstname' , userFromDB.firstname);
          // sessionStorage.setItem('lastname' , userFromDB.lastname);
          // sessionStorage.setItem('email', userFromDB.email);
          // sessionStorage.setItem('phonenumber' , userFromDB.phonenumber);
          // sessionStorage.setItem('imagePath', userFromDB.image_path);
          // sessionStorage.setItem('user_type', "1");
          // this.router.navigate(['organizer'])
          this.message = "Login only for admins!"
        }
        else{
          sessionStorage.setItem('username' , this.username);
          sessionStorage.setItem('firstname' , userFromDB.firstname);
          sessionStorage.setItem('lastname' , userFromDB.lastname);
          sessionStorage.setItem('email', userFromDB.email);
          sessionStorage.setItem('phonenumber' , userFromDB.phonenumber);
          sessionStorage.setItem('imagePath', userFromDB.image_path);
          sessionStorage.setItem('user_type', "2");
          this.message = ""
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
  unregistered(){
    this.router.navigate(['unregistered-user'])
  }

}
