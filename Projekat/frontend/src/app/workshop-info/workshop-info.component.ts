import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';
import * as L from 'leaflet';


@Component({
  selector: 'app-workshop-info',
  templateUrl: './workshop-info.component.html',
  styleUrls: ['./workshop-info.component.css']
})

export class WorkshopInfoComponent implements AfterViewInit  {
  private map;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.workshop.long, this.workshop.lat],
      zoom: 18
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    const marker = L.marker([this.workshop.long, this.workshop.lat]).addTo(this.map);
    tiles.addTo(this.map);
    
  }
  constructor(private route : ActivatedRoute, private workshopService: WorkshopService) {
    this.workshopId = route.snapshot.paramMap.get('workshopId');
    workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
      this.workshop = resp as Workshop;
      console.log(this.workshop.lat)
      console.log(this.workshop)
      this.initMap()
    })
   }
   workshopId : string;
  workshopDesc: string;
  workshop : Workshop;
  ngAfterViewInit(): void {
    
  }
  


}
