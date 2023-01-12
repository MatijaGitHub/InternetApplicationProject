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
  }
  email: string;
  sendRecoveryMail(){
    this.userService.sendRecoveryMail(this.email).subscribe((resp)=>{

    })


  }

}
