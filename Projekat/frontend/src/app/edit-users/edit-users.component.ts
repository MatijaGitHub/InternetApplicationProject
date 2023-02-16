import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {

  constructor(private userService: UserService, private workshopService: WorkshopService,
    private router : Router) { }


  users : User[]
  edit : number[] | null = [];
  firstnameUpd : string[] | null = []
  lastnameUpd : string[] | null = []
  usernameUpd : string[] | null = []
  phonenumberUpd: string[] | null = []
  emailUpd: string[] | null = []
  imageToUpload : File[] | null = []
  imageErr : string;
  user_type : number | null=2;
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((resp)=>{
      this.users = resp as User[];
      this.firstnameUpd = []
      this.lastnameUpd = []
      this.usernameUpd = []
      this.emailUpd = []
      this.phonenumberUpd = []
      this.imageToUpload = []
      this.edit = []
    })
  }
  changeFirstname(user, index){
    this.userService.changeFirstname(user.username, this.firstnameUpd[index]).subscribe((resp)=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  changeLastname(user, index){
    this.userService.changeLastname(user.username, this.lastnameUpd[index]).subscribe(resp=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  changeUsername(user, index){
    this.userService.changeUsername(user.username, this.usernameUpd[index]).subscribe((resp)=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  changePhonenumber(user, index){
    this.userService.changePhonenumber(user.username, this.phonenumberUpd[index]).subscribe((resp)=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  changeEmail(user, index){
    this.userService.changeEmail(user.username, this.emailUpd[index]).subscribe((resp)=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  deleteUser(user, userIndex){
    this.userService.deleteUser(user.username).subscribe((resp)=>{
      console.log(resp);
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
    })
  }
  changePicture(user, index){
    let formData : FormData = new FormData();
    formData.append('username', user.username);
    formData.append('image', this.imageToUpload[index]);
    
    this.userService.changeProfilePic(formData).subscribe((resp)=>{
      this.userService.getAllUsers().subscribe((resp2)=>{
        this.users = resp2 as User[];
        this.firstnameUpd = []
        this.lastnameUpd = []
        this.usernameUpd = []
        this.emailUpd = []
        this.phonenumberUpd = []
        this.imageToUpload = []
        this.edit = []
      })
      //this.image_path = resp['image_path'];
    })
  }
  editEnable(index){
    if(this.edit[index] == 1){
      this.edit[index] = 0;
    }
    else{
      this.edit[index] = 1;
    }
  }
  uploadImage(files: FileList, index):void{
    this.imageToUpload[index] = files.item(0);
    let image = new Image()
    image.src = window.URL.createObjectURL(this.imageToUpload[index])
    image.onload = () => {
      if(image.width < 100 || image.height < 100 || image.width > 300 || image.height > 300){
        this.imageErr = '0';
      } else {
        this.imageErr = '2';
        
      } 
                  
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
