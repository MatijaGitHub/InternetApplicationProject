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

  register(data){
    return this.http.post('http://localhost:4000/users/register', data);
  }
  

}
