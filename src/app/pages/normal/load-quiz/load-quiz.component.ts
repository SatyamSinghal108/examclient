import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../admin/view-quizzes/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cid:any;
  quizzes:any
  constructor(private route:ActivatedRoute, private quizService:QuizService,) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      this.cid=params['catId'];
      console.log(this.cid)
    if(this.cid!=0){
      this.quizService.getActiveQuizByCategory(this.cid).subscribe(
        (data)=>{
          this.quizzes=data;
          console.log(data);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    else{
      this.quizService.getActiveQuizzes().subscribe(
        (data)=>{
          this.quizzes=data;
          console.log(data);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
    })
     }

}
