import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../admin/view-quiz-questions/question.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  quizid:any;
  questions:any;
  marksGot=0;
  correctAnswer=0;
  attemptedQues=0;
  isSubmit=false;
  col:any;
  timer:any;
  constructor(
    private route:ActivatedRoute,
    private locationSt:LocationStrategy,
    private questionService:QuestionService
    ) { }

  ngOnInit(): void {
    this.quizid=this.route.snapshot.params['quizId'];
    this.preventBack();
    this.questionService.questions(this.quizid).subscribe(
      (data)=>{
        this.questions=data;
        
        this.timer=this.questions.length*1*60;
        
        // this.questions.forEach((q:any) => {
        //   q['givenAnswer']=''

        // });
        this.startTimer()
        console.log(this.questions)
        
      },
      (error)=>{
        console.log(error);
      }
    )

  }

  preventBack(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

  submitForm(num:any){

    if(num ==1){

      Swal.fire({
        title:"Do you want to submit the quiz ?",
        showCancelButton:true,
        showConfirmButton:true,
        confirmButtonText:"Yes",
        cancelButtonText:"No",
        icon:'info'
  
      }).then((e)=>{
        if(e.isConfirmed){
  
          this.questionService.evalQuiz(this.questions).subscribe(
            (data:any)=>{
              console.log(data);
              this.marksGot = data.marksGot;
              this.correctAnswer= data.correctAnswer;
              this.attemptedQues = data.attemptedQues;

            },
            (error)=>{
              console.log(error)
            }
          )
          this.isSubmit=true;
          // this.questions.forEach((q:any) => {
          //   if(q.givenAnswer.trim()!='' || q.givenAnswer!=null){
          //     this.attemptedQues=this.attemptedQues+1;
          //     if(q.givenAnswer == q.answer){
          //       this.correctAnswer=this.correctAnswer+1;
          //     }
          //   }
          //   this.marksGot=(this.correctAnswer*(q.quiz.maxMarks/q.quiz.numberOfQuestions)).toFixed(2)
          // })
        }
      })
    }
    else{
      this.isSubmit=true;
      this.questionService.evalQuiz(this.questions).subscribe(
        (data:any)=>{
          console.log(data);
          this.marksGot = data.marksGot;
          this.correctAnswer= data.correctAnswer;
          this.attemptedQues = data.attemptedQues;

        },
        (error)=>{
          console.log(error)
        })
      }
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.submitForm(0);
        clearInterval(t);
      }else{
        this.timer--;
        if(this.timer<=((this.questions.length*1*60)/2) && this.timer>=((this.questions.length*1*60)/4)){
          this.col="accent"
        }
        else if(this.timer<=((this.questions.length*1*60)/4) && this.timer>=0){
         this.col="warn"
        }
      }

    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer-(mm*60);
    return `${mm} min : ${ss} sec`
  }

  printPage(){
    window.print()
  }

}
