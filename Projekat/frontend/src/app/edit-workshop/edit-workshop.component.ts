import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-edit-workshop',
  templateUrl: './edit-workshop.component.html',
  styleUrls: ['./edit-workshop.component.css']
})
export class EditWorkshopComponent implements OnInit {

  constructor(private workshopService : WorkshopService, private router: Router, private route: ActivatedRoute) { }

  workshopOrganizer : string;
  user_type: number;
  workshopId : string;
  workshop : Workshop;
  workshopName : string;
  workshopDate : Date;
  workshopPlace : string;
  workshopDesc : string;
  workshopLongDesc : string;
  workshopImage: string;
  lat : number;
  long : number;
  imageToUpload : File | null = null;
  galleryImagesToUpload: File[] | null = null;
  galleryPics : string[];
  workshopNameEdit : string | null = "";
  workshopDateEdit : Date | null = null;
  workshopPlaceEdit : string | null = "";
  workshopDescEdit : string| null = "";
  workshopLongDescEdit : string| null = "";
  workshopImageEdit: string| null = "";
  latEdit : string| null = "";
  longEdit : string| null = "";
  imageErr : string;

  edit(){
    let formData = new FormData();
    formData.append('workshopId', this.workshopId);
    formData.append('workshopName', this.workshopNameEdit);
    if(this.workshopDateEdit != null){
      formData.append('olddate', this.workshopDate.toString().split('T')[0]);
      formData.append('date', this.workshopDateEdit.toString());
    }
    else{
      formData.append('olddate', this.workshopDate.toString().split('T')[0]);
      formData.append('date', this.workshopDate.toString().split('T')[0]);
    }
   
    formData.append('shortDesc', this.workshopDescEdit);
    formData.append('longDesc', this.workshopLongDescEdit);
    //formData.append('longDesc', this.longDesc);
    formData.append('lat', this.latEdit);
    formData.append('long', this.longEdit);
    formData.append('place', this.workshopPlaceEdit);
    formData.append('username', this.workshopOrganizer)
    formData.append('oldWorkshopName', this.workshop.workshopName)
    if(this.imageToUpload != null){
      
      formData.append('edit_main_picture', 'true');
      formData.append('main_picture' , this.imageToUpload);
    }
    else{
      formData.append('edit_main_picture', 'false');
    }
    if(this.galleryImagesToUpload !=null){
      formData.append('edit_gallery_pictures', 'true');
      for(let f = 0; f < this.galleryImagesToUpload.length; f++){
        formData.append('gallery_pics', this.galleryImagesToUpload[f]);
      }
    }
    else{
      formData.append('edit_gallery_pictures', 'false');
    }
    //formData.append('main_picture', this.imageToUpload);
    this.workshopService.editWorkshop(formData).subscribe((resp)=>{
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
        this.workshop = resp as Workshop;
        this.workshopOrganizer = this.workshop.organizatorUsername;
        this.workshopImage = this.workshop.workshopImage.slice(7)
        this.workshopDate = this.workshop.workshopDate;
        this.workshopName = this.workshop.workshopName;
        this.workshopLongDesc = this.workshop.workshopDescLong;
        this.workshopService.getGalleryPics(this.workshop._id).subscribe((resp)=>{
          this.galleryPics = resp as string[];
          console.log(this.galleryPics)
        })
      })
    })
  }
  ngOnInit(): void {
    this.user_type = +sessionStorage.getItem('user_type')
    this.workshopId = this.route.snapshot.paramMap.get('workshopId');
    
    this.workshopDesc = this.route.snapshot.paramMap.get('workshopDesc');
    this.workshopName = this.route.snapshot.paramMap.get('workshopName');
    this.workshopService.getWorkshopById(this.workshopId).subscribe((resp)=>{
      this.workshop = resp as Workshop;
        this.workshopOrganizer = this.workshop.organizatorUsername;
        this.workshopImage = this.workshop.workshopImage.slice(7)
        this.workshopDate = this.workshop.workshopDate;
        this.workshopLongDesc = this.workshop.workshopDescLong;
        this.workshopService.getGalleryPics(this.workshop._id).subscribe((resp)=>{
          this.galleryPics = resp as string[];
          console.log(this.galleryPics)
        })
    })
  }
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
  uploadImages(files: FileList):void{
    this.galleryImagesToUpload = [];
    for(let i = 0; i < files.length; i++){
      this.galleryImagesToUpload[i] = files.item(i);
      // let image = new Image();
      // image.src = window.URL.createObjectURL(this.galleryImagesToUpload[i]);
    }
  }
  deleteImg(picture){
    this.workshopService.deleteGalleryImg(this.workshopId, picture).subscribe((resp)=>{
      this.workshopService.getWorkshopById(this.workshopId).subscribe((resp2)=>{
        this.workshop = resp2 as Workshop;
          this.workshopOrganizer = this.workshop.organizatorUsername;
          this.workshopImage = this.workshop.workshopImage.slice(7)
          this.workshopDate = this.workshop.workshopDate;
          this.workshopLongDesc = this.workshop.workshopDescLong;
          this.workshopService.getGalleryPics(this.workshop._id).subscribe((resp3)=>{
            console.log(this.galleryPics)
            this.galleryPics = resp3 as string[];
            console.log(this.galleryPics)
          })
      })
    })
    
  }
}
