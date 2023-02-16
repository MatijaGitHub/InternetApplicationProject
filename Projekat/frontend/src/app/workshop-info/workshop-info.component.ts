import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';
import * as L from 'leaflet';
import { WorkshopComments } from '../models/workshop_comments';


@Component({
  selector: 'app-workshop-info',
  templateUrl: './workshop-info.component.html',
  styleUrls: ['./workshop-info.component.css']
})

export class WorkshopInfoComponent implements OnInit  {
  private map;
  apply(){
    this.workshopService.applyForWorkshop(sessionStorage.getItem('username'), this.workshopId).subscribe((resp)=>{
      
        this.applyMsg = resp['message'];
        this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
          this.workshop = resp as Workshop;
          this.workshopFreeSpaces = this.workshop.freeSpaces;
          this.workshopStatus = this.workshop.status;
          if(this.applyMsg == 'Applied!'){
            this.applied = 1;
          }
        })
       
    })
  }
  alertMe(){
    this.workshopService.addToWaitList(sessionStorage.getItem('username'), this.workshopId, sessionStorage.getItem('email')).subscribe((resp)=>{
      this.applyMsg = resp['message'];
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
        this.workshop = resp as Workshop;
        this.workshopFreeSpaces = this.workshop.freeSpaces;
        this.workshopStatus = this.workshop.status;
        this.applied = 0;
      })
     

    })
  }
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
  cancel(){
    let username = sessionStorage.getItem('username');
    let workshopId = this.workshop._id;
    this.workshopService.cancelParticipation(username, workshopId).subscribe((resp)=>{
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
        this.workshop = resp as Workshop;
        this.workshopFreeSpaces = this.workshop.freeSpaces;
        this.workshopStatus = this.workshop.status;
        this.applied = 0;
      })
      // this.workshopService.getWorkshopsByParticipation(this.username,0).subscribe((resp)=>{
      //   this.appliedWorkshops = resp as Workshop[];
      // })
      // this.workshopService.getWorkshopsByParticipation(this.username,0).subscribe((resp)=>{
      //   this.appliedWorkshops = resp as Workshop[];
      //   this.workshopService.get_all_workshops().subscribe((resp)=>{
      //     this.workshops = resp as Workshop[];
      //   }) 
      // })
    })
  }
  constructor(private route : ActivatedRoute, private workshopService: WorkshopService, private router : Router) { }
  workshopId : string;
  workshopDesc: string;
  workshopName: string;
  workshop : Workshop;
  liked : number | null = 0;
  applied : number |null = 0;
  workshopFreeSpaces : number;
  workshopStatus : number;
  galleryPics : string[]
  applyMsg : string
  comments : WorkshopComments[]
  commentToUpload: string;
  getComments(){
    this.workshopService.getAllComments(this.workshop._id).subscribe((resp)=>{
      this.comments = resp as WorkshopComments[];
    })
  }
  uploadComment(){
    this.workshopService.addComment(sessionStorage.getItem('username'), this.workshop._id, this.commentToUpload).subscribe((resp)=>{
      this.getComments();
    })
  }
  ngOnInit(): void {
    this.applyMsg = ""
    this.workshopId = this.route.snapshot.paramMap.get('workshopId');
    this.workshopDesc = this.route.snapshot.paramMap.get('workshopDesc');
    this.workshopName = this.route.snapshot.paramMap.get('workshopName');
    this.workshopFreeSpaces = +this.route.snapshot.paramMap.get('workshopFreeSpaces');
    this.workshopStatus = +this.route.snapshot.paramMap.get('workshopStatus');
    this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
      this.workshop = resp as Workshop;
      this.initMap()
      this.workshopService.getGalleryPics(this.workshop._id).subscribe((resp2)=>{
        this.galleryPics = resp2 as string[]
        this.workshopService.isApplied(sessionStorage.getItem('username'),this.workshopId).subscribe((result)=>{
          this.applied = result['result']
          this.workshopService.isLiked(sessionStorage.getItem('username'), this.workshop._id).subscribe((resp12)=>{
            this.liked = resp12['result'];
            this.getComments()
          })
        })
      })
    })
  }
  beginChat(){
    sessionStorage.setItem('usernameFrom' , sessionStorage.getItem('username'));
    sessionStorage.setItem('usernameTo', this.workshop.organizatorUsername);
    sessionStorage.setItem('workshopId', this.workshop._id);
    this.router.navigate(['user-chat']);
  }
  likeWorkshop(){
    this.workshopService.likeWorkshop(sessionStorage.getItem('username'), this.workshop._id).subscribe((resp)=>{
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp2)=>{
        this.workshop = resp2 as Workshop;
        this.workshopFreeSpaces = this.workshop.freeSpaces;
        this.workshopStatus = this.workshop.status;
        if(resp['message'] == 'liked'){
          this.liked = 1;
        }
      })
    })
  }
  unlikeWorkshop(){
    this.workshopService.unlikeWorkshop(sessionStorage.getItem('username'),this.workshop._id).subscribe((resp)=>{
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp2)=>{
        this.workshop = resp2 as Workshop;
        this.workshopFreeSpaces = this.workshop.freeSpaces;
        this.workshopStatus = this.workshop.status;
        if(resp['message'] == 'Uspeh!'){
          this.liked = 0;
        }
      })
    })
  }
  displayComment: number|null = 0;
  displayComments(){
    if(this.displayComment == 0){
      this.displayComment = 1;
    }
    else{
      this.displayComment = 0;
    }
  }

}
