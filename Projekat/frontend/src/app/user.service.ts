import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(usernameForm, passwordForm){
    const data = {
      username: usernameForm,
      password: passwordForm
    }

    return this.http.post('http://localhost:4000/users/login', data);
  }

  register(formData, imageToUpload){
    
    return this.http.post('http://localhost:4000/users/register', formData);
  }


  sendRecoveryMail = (emailForm)=>{
    const data = {
      email : emailForm
    }
    return this.http.post('http://localhost:4000/users/sendRecoveryMail', data);
  }

 
  changePassword(usernameForm, newPasswordForm){
    const data = {
      username: usernameForm,
      newPassword: newPasswordForm
    }
    return this.http.post('http://localhost:4000/users/changePassword', data);
  }

}
