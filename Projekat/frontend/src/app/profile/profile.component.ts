import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workshop } from '../models/workshop';
import { WorkshopComments } from '../models/workshop_comments';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService, private router : Router, private workshopService : WorkshopService) {
      this.firstname = sessionStorage.getItem('firstname');   
      this.lastname = sessionStorage.getItem('lastname'); 
      this.username = sessionStorage.getItem('username'); 
      this.phonenumber = sessionStorage.getItem('phonenumber');  
      this.email = sessionStorage.getItem('email'); 
      this.image_path = sessionStorage.getItem('imagePath').slice(7);
      this.getWorkshops();
      this.getLikedWorkshops();
      this.getWorkshopComments();
   }

  ngOnInit(): void {
  }

  firstnameUpd : string;
  lastnameUpd : string;
  usernameUpd : string;
  emailUpd : string;
  phonenumberUpd : string;
  imageToUpload : File;
  edit : number | null = 0;
  imageErr : string;

  firstname : string;
  lastname : string;
  email : string;
  phonenumber : string;
  username : string;
  image_path : string;

  workshopsPart : Workshop[];
  likedWorkshops : Workshop[];
  workshopComments : WorkshopComments[];

  changeEmail(){
    this.userService.changeEmail(this.username, this.emailUpd).subscribe((resp)=>{
      this.email = this.emailUpd;
    })
  }
  changeUsername(){
    this.userService.changeUsername(this.username, this.usernameUpd).subscribe((resp)=>{
      if(resp['message'] == 'Username changed!'){
        this.username = this.usernameUpd;
      }
    })
  }
  changeFirstname(){
    this.userService.changeFirstname(this.username, this.firstnameUpd).subscribe((resp)=>{
      this.firstname = this.firstnameUpd;
    })
  }
  changeLastname(){
    this.userService.changeLastname(this.username, this.lastnameUpd).subscribe((resp)=>{
      this.lastname = this.lastnameUpd;
    })
  }
  changePhonenumber(){
    this.userService.changePhonenumber(this.username, this.phonenumberUpd).subscribe((resp)=>{
      this.phonenumber = this.phonenumberUpd;
    })
  }
  editEnable(){
    this.edit = (this.edit == 0? 1 : 0);
  }
  changePicture(){
    let formData : FormData = new FormData();
    formData.append('username', this.username);
    formData.append('image', this.imageToUpload);
    
    this.userService.changeProfilePic(formData).subscribe((resp)=>{
      this.image_path = resp['image_path'];
    })
  }
  getWorkshops(){
    this.workshopService.getWorkshopsByParticipation(this.username, 1).subscribe((resp)=>{
        this.workshopsPart = resp as Workshop[];
    })
  }
  getLikedWorkshops(){
    this.workshopService.getWorkshopsByLikes(this.username).subscribe((resp)=>{
      
      this.likedWorkshops = resp as Workshop[];

    })
  }
  getWorkshopComments(){
    this.workshopService.getWorkshopCommentsByUser(this.username).subscribe((resp)=>{
      this.workshopComments = resp as WorkshopComments[];
    })
  }
  unlikeWorkshop(workshop){
    let workshopId = workshop._id;
    this.workshopService.unlikeWorkshop(this.username, workshopId).subscribe((resp)=>{
      this.getWorkshops();
      this.getLikedWorkshops();
    })
  }
  deleteComment(workshopComment){
    let workshopId = workshopComment.workshopId;
    this.workshopService.deleteComment(this.username, workshopId).subscribe((resp)=>{
      this.getWorkshopComments();
    })

  }
  editComment(workshopComment){
    let workshopId = workshopComment.workshopId;
    sessionStorage.setItem('workshopToEdit', workshopId);
    this.router.navigate(['edit-comment']);
    // this.workshopService.editComment(this.username,workshopId).subscribe((resp)=>{
    //   this.getWorkshopComments();
    // })
  }


  ////////////////////////////////////////////////
  sortByWorkShopName(){
    this.workshopsPart.sort((w1, w2)=> w1.workshopName.toLowerCase() > w2.workshopName.toLowerCase()? 1: -1);
  }
  sortByWorkShopDate(){
    this.workshopsPart.sort((w1, w2)=> w1.workshopDate > w2.workshopDate? -1: 1);
  }
  sortByWorkShopPlace(){
    this.workshopsPart.sort((w1, w2)=> w1.workshopPlace.toLowerCase() > w2.workshopPlace.toLowerCase()? 1: -1);
  }
  sortByWorkShopDesc(){
    this.workshopsPart.sort((w1, w2)=> w1.workshopDesc.toLowerCase() > w2.workshopDesc.toLowerCase()? 1: -1);
  }
  sortByWorkShopLikes(){
    this.workshopsPart.sort((w1, w2)=> w1.numOfLikes > w2.numOfLikes? -1: 1);
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
  
}
