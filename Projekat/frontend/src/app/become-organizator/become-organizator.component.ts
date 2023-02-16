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
    this.user_type =  +sessionStorage.getItem('user_type');
  }
  user_type : number;
  imageToUpload: File | null = null;
  imageToUploadJSON : string | null = "";
  galleryImagesToUpload: File[] | null = null;
  galleryImagesToUploadJSON : string[] | null = [];
  imageErr: string | null = "";
  name_of_work: string| null = "";
  place: string| null = "";
  latitude: string| null = "";
  longtitude: string| null = "";
  date: Date;
  shortDesc: string| null = "";
  longDesc: string| null = "";
  numOfSpaces: string| null = "0";
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
      this.imageToUploadJSON = ""               
    }
  }
  sendWorkshopRequest(){
    let formData = new FormData();
    formData.append('workshopName', this.name_of_work);
    formData.append('oldWorkshopName', this.name_of_work)
    formData.append('date', this.date.toString().split('T')[0]);
    formData.append('olddate', this.date.toString().split('T')[0]);
    formData.append('shortDesc', this.shortDesc);
    formData.append('longDesc', this.longDesc);
    formData.append('lat', this.latitude);
    formData.append('long', this.longtitude);
    formData.append('place', this.place);
    formData.append('numOfSpaces', this.numOfSpaces);
    formData.append('username', sessionStorage.getItem('username'))
    if(this.imageToUpload != null){
      formData.append('main_picture', this.imageToUpload);
      formData.append('main_picture_path', "")
    }
    else{
      formData.append('main_picture_path', this.imageToUploadJSON)
    }
    if(this.galleryImagesToUpload != null){
      for(let f = 0; f < this.galleryImagesToUpload.length; f++){
        formData.append('gallery_pics', this.galleryImagesToUpload[f]);
      }
    }
    for(let f = 0; f < this.galleryImagesToUploadJSON.length; f++){
      formData.append('gallery_pics_paths', this.galleryImagesToUploadJSON[f]);
    }
    let uploadLen = this.galleryImagesToUpload==null?0:this.galleryImagesToUpload.length;
    let jsonLen = this.galleryImagesToUploadJSON==null?0:this.galleryImagesToUploadJSON.length;
   if(uploadLen + jsonLen > 5){
      console.log("Too many gallery pics!");
      return;
   }
    this.workshopService.suggestWorkshop(formData).subscribe((resp)=>{
        console.log(resp)
    })
  }
  removeGalleryPic(index){
    this.galleryImagesToUploadJSON.splice(index, 1)
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
  jsonFile : File;
  loadJSON(event){
    this.jsonFile = event.target.files[0]
  }
  parseJSON(){
    const flReader = new FileReader();
    flReader.readAsText(this.jsonFile, "UTF-8");
    flReader.onload = () =>{
      let newWorkshop;
      newWorkshop = (JSON.parse(flReader.result.toString()))
      this.latitude = newWorkshop['lat'];
      this.longtitude = newWorkshop['long'];
      this.place = newWorkshop['workshopPlace']
      this.name_of_work = newWorkshop['workshopName'];
      this.date = newWorkshop['workshopDate']
      this.imageToUploadJSON = newWorkshop['workshopMainImage'].slice(7)
     
      this.shortDesc = newWorkshop['workshopDesc']
      this.galleryImagesToUploadJSON = [];
      for(let galleryPic of newWorkshop['galleryPics']){
        this.galleryImagesToUploadJSON.push(galleryPic);
      }
    }
  }
}
