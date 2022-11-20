import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  quizid:any;
  title:any;
  questions:any=[];
  constructor(
    private routes:ActivatedRoute,
    private questionService:QuestionService
  ) { }

  ngOnInit(): void {

    this.quizid=this.routes.snapshot.params['qid'];
    this.title=this.routes.snapshot.params['title'];
    this.questionService.questionsAll(this.quizid).subscribe(
      (data)=>{
        this.questions=data;
        console.log(data)
      },
      (error)=>{ 
        console.log(error)
        Swal.fire("Error","Error in loading questions",'error')
      }
    )
  }

  delete(quesid:any){

    Swal.fire({
      icon:'info',
      title:"Are You Sure?",
      confirmButtonText:"Confirm",
      cancelButtonText:"Cancel",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
      
        this.questionService.deleteQuestion(quesid).subscribe(
          (data)=>{
            console.log(data);
             this.questions=this.questions.filter((question:any)=>question.quesid!=quesid)
            Swal.fire("Success!!","Deleted Successfully",'success');
          },
          (error)=>{
            Swal.fire("Error!!","Server Error",'error');
          }
        )
      }
    })
  }

}
