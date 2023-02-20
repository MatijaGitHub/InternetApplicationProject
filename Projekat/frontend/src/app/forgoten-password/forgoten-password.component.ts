import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgoten-password',
  templateUrl: './forgoten-password.component.html',
  styleUrls: ['./forgoten-password.component.css']
})
export class ForgotenPasswordComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.message = ""
  }
  email: string | null = "";
  message : string;
  sendRecoveryMail(){
    if(this.email == ""){
      this.message = "Please enter email!"
    }
    else{
      this.userService.sendRecoveryMail(this.email).subscribe((resp)=>{
        console.log(resp);
        this.message = "Email sent!"
      })
    }
   


  }

}
