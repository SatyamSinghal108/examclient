import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from '../view-categories/category.service';
import { QuizService } from '../view-quizzes/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  category:any;
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:false,
    category:{
      cid:''
    }
  }
  constructor(private _categoryService:CategoryService, private _quizService:QuizService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this._categoryService.category().subscribe(
    (data:any)=>{
      console.log(data);
      this.category=data;
    },
    (error:any)=>{
      console.log(error)
      Swal.fire("Error","Error in server!",'error')
    });
  }

  formSubmit(){
    console.log(this.quizData);
    if(this.quizData.title.trim()==''|| this.quizData.title == null)
    {
      this.snackbar.open("Title required!!",'',{
        duration:3000
      });
      return;
    }
    if(this.quizData.description.trim()==''|| this.quizData.description == null)
    {
      this.snackbar.open("description required!!",'',{
        duration:3000
      });
      return;
    }
    if(this.quizData.maxMarks == null)
    {
      this.snackbar.open("Maximum marks required!!",'',{
        duration:3000
      });
      return;
    }if( this.quizData.numberOfQuestions == null)
    {
      this.snackbar.open("Questions required!!",'',{
        duration:3000
      });
      return;
    }if(this.quizData.category.cid == null)
    {
      this.snackbar.open("Title required!!",'',{
        duration:3000
      });
      return;
    }

    this._quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire("Success!!","Quiz Added Successfully",'success')
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:false,
          category:{
            cid:''
          }
        }
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error!!","Server Error!",'error');
      }
    );
  }
}
