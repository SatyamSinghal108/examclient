import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../view-quiz-questions/question.service';


@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  quizId:any;
  question={
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor(private route:ActivatedRoute, private questionService:QuestionService, private snackbar:MatSnackBar) {

   }

  ngOnInit(): void {

    this.quizId=this.route.snapshot.params['qid'];
    this.question.quiz.qid=this.quizId;
  }

  formSubmit(){
    if(this.question.content.trim()==''|| this.question.content == null)
    {
      this.snackbar.open("Question required!!",'',{
        duration:3000
      });
      return;
    }
    if(this.question.option1.trim()==''|| this.question.option1 == null)
    {
      this.snackbar.open("Question required!!",'',{
        duration:3000
      });
      return;
    }
    if(this.question.option2.trim()==''|| this.question.option2 == null)
    {
      this.snackbar.open("Question required!!",'',{
        duration:3000
      });
      return;
    }
    if(this.question.answer.trim()==''|| this.question.answer == null)
    {
      this.snackbar.open("Question required!!",'',{
        duration:3000
      });
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Success","Question Added",'success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Server Error!!",'error')
      }
    )
  }

}
