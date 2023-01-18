import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  repeat_password: string| null = "";
  new_password: string| null = "";
  old_password: string| null = "";
  errMsg: string| null = "";
  response: string|null = "";
  ngOnInit(): void {
  }

  changePassword(){
    this.errMsg = "";
    this.response = "";
    if(this.repeat_password == "" || this.new_password == "" || this.old_password == ""){
      this.errMsg = "Enter all fields!";
      return;
    }
    if(this.new_password != this.repeat_password){
      this.errMsg = "Passwords dont match!";
      return;
    }
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z][A-Za-z\d@$!%*?&]{7,15}$/
    if(!passwordRegex.test(this.new_password)){
      this.errMsg = "Passwords in wrong format!";
      return;
    }
    let username = sessionStorage.getItem('username');
    this.userService.changePassword(this.old_password,username, this.new_password).subscribe((resp)=>{
        this.response = resp['message'];
        if(this.response == "Password changed!"){
          this.logout();
        }
    })
   

    


  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
