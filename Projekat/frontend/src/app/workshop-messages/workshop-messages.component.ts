import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../models/chat';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-workshop-messages',
  templateUrl: './workshop-messages.component.html',
  styleUrls: ['./workshop-messages.component.css']
})
export class WorkshopMessagesComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private router: Router, private route : ActivatedRoute) {
    

  }


  displayChat(chatIndex){
    this.chatDisplayed[chatIndex] = 1;
  }

  hideChat(chatIndex){
    this.chatDisplayed[chatIndex] = 0;
  }
  workshopId : string;
  chatDisplayed : number[];
  chats: Chat[];

  ngOnInit(): void {
    this.workshopId = this.route.snapshot.paramMap.get('workshopIdMess');
    
    this.workshopService.getChatsByWorkshop(this.workshopId).subscribe((resp)=>{
      this.chats = resp as Chat[];
      this.chatDisplayed = [];
      for(let i = 0; i < this.chats.length; i++){
        this.chatDisplayed[i] = 0;
      }
    })
  }
  back(){
    this.router.navigate(['organizer']);
  }
}
