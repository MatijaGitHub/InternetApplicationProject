import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';
import { saveAs } from 'file-saver';
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
      this.workshopService.getWorkshopsByParticipation(this.username,0).subscribe((resp)=>{
        this.appliedWorkshops = resp as Workshop[];
        this.workshopService.get_all_workshops().subscribe((resp)=>{
          this.workshops = resp as Workshop[];
        }) 
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
  changePass(){
    this.router.navigate(['change-password']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  moreInfo(workshop){
    this.router.navigate(['workshop-info', {workshopId : workshop._id, workshopDesc : workshop.workshopDesc, workshopName : workshop.workshopName, workshopStatus : workshop.status,
    workshopFreeSpaces : workshop.freeSpaces}])
  }
  editWorkshop(workshop){
    this.router.navigate(['edit-workshop', {workshopId : workshop._id, workshopDesc : workshop.workshopDesc, workshopName : workshop.workshopName, workshopStatus : workshop.status,
      workshopFreeSpaces : workshop.freeSpaces}])
  }
  sortByDate(){
    this.workshops.sort((w1, w2)=> w1.workshopDate > w2.workshopDate? -1: 1);
  }
  sortByName(){
    this.workshops.sort((w1, w2)=> w1.workshopName.toLowerCase() > w2.workshopName.toLowerCase()? 1: -1);
  }
  saveWorkshopAsJSON(workshop){
    this.workshopService.getGalleryPics(workshop._id).subscribe((resp)=>{
      //let galleryPicsFromDb = resp as string[]
      var data = {
        workshopName : workshop.workshopName,
        workshopDate : workshop.workshopDate,
        workshopMainImage : workshop.workshopImage,
        workshopPlace : workshop.workshopPlace,
        workshopDesc : workshop.workshopDesc,
        lat : workshop.lat,
        long : workshop.long,
        galleryPics : resp
      };
      var fileName = 'workshopPattern.json';
      
      // Create a blob of the data
      var fileToSave = new Blob([JSON.stringify(data)], {
          type: 'application/json'
      });
  
      saveAs(fileToSave, fileName);
    })
    
  }
}
