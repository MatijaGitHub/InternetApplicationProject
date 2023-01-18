import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-unregistered-user',
  templateUrl: './unregistered-user.component.html',
  styleUrls: ['./unregistered-user.component.css']
})
export class UnregisteredUserComponent implements OnInit {

  constructor(private router: Router, private workshopService: WorkshopService) {
    workshopService.get_all_workshops().subscribe((resp)=>{
      this.workshops = resp as Workshop[];
    })
    workshopService.get_top_5().subscribe((resp)=>{
      this.workshops_top_5 = resp as Workshop[];
    })
   }

  ngOnInit(): void {
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
  sortByDate(){
    this.workshops.sort((w1, w2)=> w1.workshopDate > w2.workshopDate? -1: 1);
  }
  sortByName(){
    this.workshops.sort((w1, w2)=> w1.workshopName.toLowerCase() > w2.workshopName.toLowerCase()? 1: -1);
  }
}
