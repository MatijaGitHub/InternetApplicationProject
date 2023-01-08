import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.is_user = +this.route.snapshot.paramMap.get('is_user');
  }
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirm_password: string;
  number: string;
  email: string;
  add: string;
  is_user: number;
  name_of_org: string;
  id_num: string;
  register(){

  }

}
