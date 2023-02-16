import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-workshop-aprove',
  templateUrl: './workshop-aprove.component.html',
  styleUrls: ['./workshop-aprove.component.css']
})
export class WorkshopAproveComponent implements OnInit {

  constructor(private router : Router, private workshopService: WorkshopService) { }
  user_type : number | null = 2;
  ngOnInit(): void {
    this.getUnaprovedWorkshops();
  }
  workshops : Workshop[];
  getUnaprovedWorkshops(){
    this.workshopService.getUnaprovedWorkshops().subscribe((resp)=>{
      this.workshops = resp as Workshop[];
    })
  }
  changePass(){
    this.router.navigate(['change-password']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  accept(workshop){
    this.workshopService.acceptWorkshop(workshop._id);
  }
  reject(workshop){
    this.workshopService.rejectWorkshop(workshop._id);
  }

}
