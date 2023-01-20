import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-user-workshops',
  templateUrl: './user-workshops.component.html',
  styleUrls: ['./user-workshops.component.css']
})
export class UserWorkshopsComponent implements OnInit {

  constructor(private router : Router, private workshopService: WorkshopService) {
    this.username = sessionStorage.getItem('username');
    workshopService.getWorkshopsByParticipation(this.username,0).subscribe((resp)=>{
      this.appliedWorkshops = resp as Workshop[];
      workshopService.get_all_workshops().subscribe((resp)=>{
        this.workshops = resp as Workshop[];
      }) 
    })
     
  }
  

  ngOnInit(): void {
  }
  twelveHoursLeft(workshop : Workshop) : number{
    let nowDate =new Date()
    let workshopDate = new Date(workshop.workshopDate)
    var hours = Math.abs(workshopDate.getTime() - nowDate.getTime()) / (60*60*1000);
    console.log(workshopDate)
    console.log(nowDate)
    console.log(hours)
    if(hours >= 12){
      return 1;
    }
    else{
      return 0;
    }
  
  }
  appliedWorkshops : Workshop[]
  username : string;
  cancel(workshop){
    let username = this.username;
    let workshopId = workshop._id;
    this.workshopService.cancelParticipation(username, workshopId).subscribe((resp)=>{
      this.workshopService.getWorkshopsByParticipation(this.username,0).subscribe((resp)=>{
        this.appliedWorkshops = resp as Workshop[];
      })  
    })
  }
  workshops: Workshop[];
  workshops_top_5: Workshop[];
  name: string| null = "";
  place: string| null = "";
  search(){
    if(this.name == "" && this.place == ""){
      this.workshopService.get_all_workshops().subscribe((resp)=>{
        this.workshops = resp as Workshop[];
      })
    }
    else{
      this.workshopService.get_filter_workshops(this.name, this.place).subscribe((resp)=>{
          this.workshops = resp as Workshop[];
      })
    }
    
  }
  moreInfo(workshop){
    this.router.navigate(['workshop-info', {workshopId : workshop._id}])
  }
  sortByDate(){
    this.workshops.sort((w1, w2)=> w1.workshopDate > w2.workshopDate? -1: 1);
  }
  sortByName(){
    this.workshops.sort((w1, w2)=> w1.workshopName.toLowerCase() > w2.workshopName.toLowerCase()? 1: -1);
  }

}
