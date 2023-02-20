import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Applications } from '../models/user_workshop';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  constructor(private route : ActivatedRoute, private workshopService: WorkshopService, private router : Router) { }
  user_type : number
  workshop : Workshop;
  workshopId : string;
  applications: User_Applications[]
  ngOnInit(): void {
    this.user_type = +sessionStorage.getItem('user_type')
    this.workshopId = this.route.snapshot.paramMap.get('workshopId');
    this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
      this.workshop = resp as Workshop;
      this.workshopService.getApplications(this.workshopId).subscribe((resp2)=>{
        this.applications = resp2 as User_Applications[];
      })
    })
  }
  accept(application){
    this.workshopService.acceptApplication(this.workshopId, application.username).subscribe((resp)=>{
      console.log(resp);
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
        this.workshop = resp as Workshop;
        this.workshopService.getApplications(this.workshopId).subscribe((resp2)=>{
          this.applications = resp2 as User_Applications[];
        })
      })
    })
  }
  deny(application){
    this.workshopService.denyApplication(this.workshopId, application.username).subscribe((resp)=>{
      console.log(resp);
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
        this.workshop = resp as Workshop;
        this.workshopService.getApplications(this.workshopId).subscribe((resp2)=>{
          this.applications = resp2 as User_Applications[];
        })
      })
    })
  }
}
