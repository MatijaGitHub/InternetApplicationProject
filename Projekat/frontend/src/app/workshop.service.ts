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
}
