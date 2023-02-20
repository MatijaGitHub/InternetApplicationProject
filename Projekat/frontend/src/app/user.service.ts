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

 
  changePassword(oldpasswordForm, usernameForm, newPasswordForm){
    const data = {
      oldPassword : oldpasswordForm,
      username: usernameForm,
      newPassword: newPasswordForm
    }
    return this.http.post('http://localhost:4000/users/changePassword', data);
  }
  changeFirstname(usernameForm, newFirstnameForm){
    const data = {
      username : usernameForm,
      firstname: newFirstnameForm
    }
    return this.http.post('http://localhost:4000/users/changeFirstname', data);
  }
  changeLastname(usernameForm, newLastnameForm){
    const data = {
      username : usernameForm,
      lastname: newLastnameForm
    }
    return this.http.post('http://localhost:4000/users/changeLastname', data);
  }
  changeUsername(usernameForm, newUsernameForm){
    const data = {
      username : usernameForm,
      usernameNew: newUsernameForm
    }
    return this.http.post('http://localhost:4000/users/changeUsername', data);
  }
  changeEmail(usernameForm, newEmailForm){
    const data = {
      username : usernameForm,
      email: newEmailForm
    }
    return this.http.post('http://localhost:4000/users/changeEmail', data);
  }
  changePhonenumber(usernameForm, newPhonenumberForm){
    const data = {
      username : usernameForm,
      phonenumber: newPhonenumberForm
    }
    return this.http.post('http://localhost:4000/users/changePhonenumber', data);
  }
  changeProfilePic(formData){
    return this.http.post('http://localhost:4000/users/changePicture', formData);
  }
  getAllUsers(){
    return this.http.get('http://localhost:4000/users/getAllUsers');
  }
  getAllUsersRequest(){
    return this.http.get('http://localhost:4000/users/getAllUsersRequest');
  }
  deleteUser(usernameForm){
    const data = {
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/users/deleteUser', data);
  }
  acceptRegistration(usernameForm){
    const data = {
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/users/acceptRegistrationRequest', data);
  }
  getUserPicturePath(usernameForm){
    const data = {
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/users/getPicturePath', data);
  }
}
