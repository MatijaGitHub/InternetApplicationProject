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
  errMsg: string| null = "";
  response: string|null = "";
  ngOnInit(): void {
  }

  changePassword(){
    this.errMsg = "";
    this.response = "";
    if(this.repeat_password == "" || this.new_password == ""){
      this.errMsg = "Enter all fields!";
      return;
    }
    if(this.new_password != this.repeat_password){
      this.errMsg = "Passwords dont match!";
      return;
    }
    let username = sessionStorage.getItem('username');
    this.userService.changePassword(username, this.new_password).subscribe((resp)=>{
        this.response = resp['message'];
    })

    


  }

}
