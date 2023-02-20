import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopService } from '../workshop.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  constructor(private router: Router, private workshopService: WorkshopService) { }
  new_comment : string;
  user_type : number;
  ngOnInit(): void {
    this.user_type = +sessionStorage.getItem('user_type')
  }
  editComment(){
    this.workshopService.editComment(sessionStorage.getItem('username'),sessionStorage.getItem('workshopToEdit'), this.new_comment).subscribe((resp)=>{
      this.router.navigate(['user']);
    })
  }

}
