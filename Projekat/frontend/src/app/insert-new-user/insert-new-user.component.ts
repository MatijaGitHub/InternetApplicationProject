import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-insert-new-user',
  templateUrl: './insert-new-user.component.html',
  styleUrls: ['./insert-new-user.component.css']
})
export class InsertNewUserComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private router: Router) { }
  user_type : number | null = 2;
  ngOnInit(): void {
  }
  changePass(){
    this.router.navigate(['change-password']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
