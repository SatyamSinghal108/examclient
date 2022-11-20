import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../view-categories/category.service';
import { QuizService } from '../view-quizzes/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  qid = 0;
  category: any;
  quiz: any;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private snackbar: MatSnackBar,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    // alert(this.qid)
    this.quizService.quizById(this.qid).subscribe((data) => {
      this.quiz = data;
      // console.log(this.quizData)
    });

    this.categoryService.category().subscribe(
      (data) => {
        this.category = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formSubmit() {
    console.log(this.quiz);
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this.snackbar.open('Title required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.description.trim() == '' || this.quiz.description == null) {
      this.snackbar.open('description required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.maxMarks == null) {
      this.snackbar.open('Maximum marks required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.numberOfQuestions == null) {
      this.snackbar.open('Questions required!!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.quiz.category.cid == null) {
      this.snackbar.open('Title required!!', '', {
        duration: 3000,
      });
      return;
    }

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success !!', 'Updated Successfully !', 'success').then((e)=>{
          this.router.navigate(['/admin-dashboard/quizzes'])
        });

      },
      (error) => {
        Swal.fire('Error !!', 'Server Error !', 'error');
      }
    );
  }
}
