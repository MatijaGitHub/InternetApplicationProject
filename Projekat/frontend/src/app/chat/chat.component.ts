import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../models/chat';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  constructor(private workshopService: WorkshopService) { }


  @Input() fromUser : boolean | null = true;
  @Input() usernameTo: string;
  @Input() usernameFrom: string;
  @Input() workshopId: string;
  usernameRight : string;
  messageToSend: string | null = "";
  chat: Chat;
  ngOnInit(): void {
    this.usernameRight = this.usernameTo;
    if(this.fromUser == true){
      this.usernameTo = sessionStorage.getItem('usernameTo');
      this.usernameFrom = sessionStorage.getItem('usernameFrom');
      this.workshopId = sessionStorage.getItem('workshopId');
      this.usernameRight = this.usernameFrom;
     
    }
  
    this.workshopService.getChat(this.usernameFrom, this.workshopId).subscribe((resp)=>{
      this.chat = resp as Chat;
      console.log(this.chat.messages)
    })
  }
  sendMessage(){
    if(this.messageToSend != ""){
      let usernameSender = this.chat.username1;
      if(!this.fromUser){
        usernameSender = this.chat.username2;
      }
      console.log(usernameSender, this.chat.username1, this.chat.username2);
      this.workshopService.postMessageToChat(this.chat.username1, this.chat.username2,usernameSender,this.messageToSend,this.chat.workshopId).subscribe((resp)=>{
        this.workshopService.getChat(this.chat.username1, this.workshopId).subscribe((resp)=>{
          this.chat = resp as Chat;
          this.messageToSend = ""
        })
      })
    }
    else{
      this.messageToSend = ""
    }

 
  }

}
