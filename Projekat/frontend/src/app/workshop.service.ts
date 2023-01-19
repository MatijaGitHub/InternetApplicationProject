import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  get_all_workshops(){
    return this.http.get('http://localhost:4000/workshops/get_all_workshops');
  }
  get_filter_workshops(nameForm, placeForm){
    const data = {
      name: nameForm,
      place: placeForm
    }
    return this.http.post('http://localhost:4000/workshops/get_filter_workshops', data);
  }
  get_top_5(){
    return this.http.get('http://localhost:4000/workshops/get_top_5');
  }
  getWorkshopsByParticipation(usernameForm, p_flag){
    const data = {
      username : usernameForm,
      participated : p_flag
    }
    return this.http.post('http://localhost:4000/workshops/getWorkshops' , data);
  }
  getWorkshopsByLikes(usernameForm){
    const data = {
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/getWorkshopByLikes' , data);
  }
  getWorkshopCommentsByUser(usernameForm){
    const data = {
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/getWorkshopCommentsByUser' , data);
  }
  unlikeWorkshop(usernameForm, workshopIdForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/unlikeWorkshop', data);
  }
  editComment(usernameForm, workshopIdForm, commentForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm,
      comment : commentForm
    }
    return this.http.post('http://localhost:4000/workshops/editComment', data);
  }
  deleteComment(usernameForm, workshopIdForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/deleteComment', data);
  }
  cancelParticipation(usernameForm, workshopIdForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/cancelParticipation', data);
  }
}
