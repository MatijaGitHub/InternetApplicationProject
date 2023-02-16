import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-become-organizator',
  templateUrl: './become-organizator.component.html',
  styleUrls: ['./become-organizator.component.css']
})
export class BecomeOrganizatorComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private router: Router) { }

  ngOnInit(): void {
  }
  imageToUpload: File;
  galleryImagesToUpload: File[];
  imageErr: string;
  name_of_work: string;
  place: string;
  latitude: string;
  longtitude: string;
  date: Date;
  shortDesc: string;
  longDesc: string;
  numOfSpaces: string;
  uploadImage(files: FileList):void{
    this.imageToUpload = files.item(0);
    let image = new Image()
    image.src = window.URL.createObjectURL(this.imageToUpload)
    image.onload = () => {
      if(image.width < 100 || image.height < 100 || image.width > 300 || image.height > 300){
        this.imageErr = '0';
      } else {
        this.imageErr = '2';
        
      }                
    }
  }
  sendWorkshopRequest(){
    let formData = new FormData();
    //formData.append('main_picture', this.imageToUpload);
    // for(let file of this.galleryImagesToUpload){
    //   formData.append('gallery_pics', file);
    // }
    formData.append('workshopName', this.name_of_work);
    formData.append('date', this.date.toString());
    formData.append('shortDesc', this.shortDesc);
    formData.append('longDesc', this.longDesc);
    formData.append('lat', this.latitude);
    formData.append('long', this.longtitude);
    formData.append('place', this.place);
    formData.append('numOfSpaces', this.numOfSpaces);
    formData.append('username', sessionStorage.getItem('username'))
    formData.append('main_picture', this.imageToUpload);
    for(let f = 0; f < this.galleryImagesToUpload.length; f++){
      formData.append('gallery_pics', this.galleryImagesToUpload[f]);
    }
    this.workshopService.suggestWorkshop(formData).subscribe((resp)=>{
        console.log(resp)
    })
  }
  uploadImages(files: FileList):void{
    this.galleryImagesToUpload = [];
    for(let i = 0; i < files.length; i++){
      this.galleryImagesToUpload[i] = files.item(i);
      // let image = new Image();
      // image.src = window.URL.createObjectURL(this.galleryImagesToUpload[i]);
    }
  }
  changePass(){
    this.router.navigate(['change-password']);
  }
  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
