import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.is_user = +this.route.snapshot.paramMap.get('is_user');
  }
  firstname: string | null = "";
  lastname: string| null = "";
  username: string| null = "";
  password: string| null = "";
  confirm_password: string| null = "";
  number: string| null = "";
  email: string| null = "";
  country: string| null = "";
  city: string| null = "";
  street: string| null = "";
  zipcode: string| null = "";
  is_user: number;
  name_of_org: string| null = "";
  id_num: string| null = "";
  imageMsg: string;
  errorMsg: string;
  address: Address;
  imageToUpload : File;
  register(){
    this.errorMsg = "";
    if(this.firstname == "" || this.lastname == "" || this.username == "" || this.password == "" 
        || this.confirm_password == "" || this.number == "" || this.email == ""){
      this.errorMsg = "Enter all fields!";
      return;
    }
    if(this.password != this.confirm_password){
      this.errorMsg = "Passwords dont match!";
      return;
    }
    const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const numberRegex: RegExp = /^[0-9]{7,7}/;
    if(!emailRegex.test(this.email)){
      this.errorMsg = "Email in wrong format!";
      return;
    }
    if(!numberRegex.test(this.number)){
      this.errorMsg = "Number in wrong format!";
      return;
    }
    let data;
    if(this.is_user){
      data = {
        is_user : 1,
        firstname : this.firstname,
        lastname : this.lastname,
        username : this.username,
        password : this.password,
        number : this.number,
        email : this.email
      }
    }
    else{
      if(!((this.city == "" && this.country == "" && this.street == "" && this.zipcode == "")
      ||(this.city != "" && this.country != "" && this.street != "" && this.zipcode != ""))){
        this.errorMsg = "Enter all address fields!";
        return;
      }
      data = {
        is_user : 0,
        firstname : this.firstname,
        lastname : this.lastname,
        username : this.username,
        password : this.password,
        number : this.number,
        email : this.email,
        city : this.city,
        name_of_org : this.name_of_org,
        country : this.country,
        street: this.street,
        id_num : this.id_num,
        zipcode: this.zipcode
      }
    }
    this.userService.register(data).subscribe((resp)=>{
        this.errorMsg = resp['message'];
    })
  }
  uploadImage(files: FileList):void{
    this.imageToUpload = files.item(0);
    let image = new Image()
    image.src = window.URL.createObjectURL(this.imageToUpload)
    image.onload = () => {
      if(image.width < 100 || image.height < 100 || image.width > 300 || image.height > 300){
        this.imageMsg = "Wrong dimensions!";
      } else {
        /** 
         * Upload
        */
      }                
    }
  }
}
