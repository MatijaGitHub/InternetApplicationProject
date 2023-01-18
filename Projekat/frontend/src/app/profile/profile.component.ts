import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService : UserService, private router : Router) {
      this.firstname = sessionStorage.getItem('firstname');   
      this.lastname = sessionStorage.getItem('lastname'); 
      this.username = sessionStorage.getItem('username'); 
      this.phonenumber = sessionStorage.getItem('phonenumber');  
      this.email = sessionStorage.getItem('email'); 
      this.image_path = sessionStorage.getItem('imagePath').slice(7);
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
