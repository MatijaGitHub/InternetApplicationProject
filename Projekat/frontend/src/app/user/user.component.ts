import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
export interface INavLink {
  id : number; 
  pathLink : string;
  label : string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }
  selectedNavLink : INavLink;
  routeToLink = () => {
    this.router.navigate([this.selectedNavLink.pathLink]);
  }
  navLinks : Array<INavLink> = [
    { pathLink : '/home', label : 'Home', id: 1 },
    { pathLink : '/about', label : 'About', id: 2 }
  ];
  
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
