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
  getWorkshopsByOrganizator(usernameForm){
    const data = {
      username: usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/getOrganizatorWorkshops' , data);
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
  getWorkshopById(idForm){
    const data = {
      id: idForm
    }
    return this.http.post('http://localhost:4000/workshops/getWorkshopById', data);
  }
  getGalleryPics(wid){
    const data = {
      workshopId : wid
    }
    return this.http.post('http://localhost:4000/workshops/getGalleryPics', data);
  }
  applyForWorkshop(usernameForm, wid){
    const data = {
      workshopId : wid,
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/applyForWorkshop', data);
  }
  addToWaitList(usernameForm, wid, emailUser){
    const data = {
      workshopId : wid,
      username : usernameForm,
      email : emailUser
    }
    return this.http.post('http://localhost:4000/workshops/addToWaitList', data);
  }
  isApplied(usernameForm, wid){
    const data = {
      workshopId : wid,
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/isApplied', data);
  }
  getChat(usernameForm, wid){
    const data = {
      workshopId : wid,
      username : usernameForm
    }
    return this.http.post('http://localhost:4000/workshops/getChat', data);
  }
  postMessageToChat(usernameUserForm,usernameOrgForm,usernameSenderForm,messageForm ,wid){
    const data = {
      workshopId : wid,
      usernameOrganizer : usernameOrgForm,
      usernameUser : usernameUserForm,
      usernameSender : usernameSenderForm,
      message : messageForm
    }
    return this.http.post('http://localhost:4000/workshops/postMessageToChat', data);
  }
  likeWorkshop(usernameForm, workshopIdForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/likeWorkshop', data);
  }
  isLiked(usernameForm, workshopIdForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/isLiked', data);
  }

  getAllComments(workshopIdForm){
    const data = {
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/getAllComments', data);
  }
  addComment(usernameForm, workshopIdForm, commentForm){
    const data = {
      username : usernameForm,
      workshopId : workshopIdForm,
      comment : commentForm
    }
    return this.http.post('http://localhost:4000/workshops/addComment', data)
  }
  suggestWorkshop(formData){
    return this.http.post('http://localhost:4000/workshops/suggestWorkshop', formData);
  }
  editWorkshop(formData){
    return this.http.post('http://localhost:4000/workshops/editWorkshop', formData);
  }
  uploadImagesForWorkshop(formData){
    return this.http.post('http://localhost:4000/workshops/uploadImagesForWorkshop', formData);
  }
  getChatsByWorkshop(workshopIdForm){
    const data = {
      workshopId : workshopIdForm
    }
    return this.http.post('http://localhost:4000/workshops/getChatsByWorkshop', data)
  }
  deleteGalleryImg(widForm, pictureForm){
    const data = {
      workshopId : widForm,
      galleryPicture : pictureForm
    }
    return this.http.post('http://localhost:4000/workshops/deleteGalleryImg', data)
  }
}
