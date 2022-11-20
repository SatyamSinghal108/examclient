import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any;
  green="#0be33a"

  constructor(private _quiz:QuizService ) { }

  ngOnInit():void{

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error!!","Error in loading data from server",'error');
      })
  }

  deleteQuiz(id:any){
    
    Swal.fire({
      icon:'info',
      title:"Are You Sure?",
      confirmButtonText:"Confirm",
      cancelButtonText:"Cancel",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(id).subscribe(
          (data)=>{
            console.log(data);
           this.quizzes = this.quizzes.filter((quiz:any)=>quiz.qid!=id)
            Swal.fire("Success","Quiz Deleted Successfully!","success")
          },
          (error)=>{
            console.log(error);
            Swal.fire("Error","Server Error",'error')
          }
        )
      }
    })
  }

}
