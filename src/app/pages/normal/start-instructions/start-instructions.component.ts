import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { QuizService } from '../../admin/view-quizzes/quiz.service';

@Component({
  selector: 'app-start-instructions',
  templateUrl: './start-instructions.component.html',
  styleUrls: ['./start-instructions.component.css']
})
export class StartInstructionsComponent implements OnInit {

  quizId:any;
  quiz:any;
  constructor(private route:ActivatedRoute, private quizService:QuizService, private router:Router) { }

  ngOnInit(): void {
    this.quizId=this.route.snapshot.params['qId']
    // console.log(this.quizId)
    this.quizService.quizById(this.quizId).subscribe(
      (data:any)=>{
        this.quiz=data;
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  start(){
    Swal.fire({
      title:"Do you want to start the quiz?",
      confirmButtonText:'Start',
      showCancelButton:true,
      icon:'info',
    }).then(
      (result:any)=>{
        if(result.isConfirmed){
          this.router.navigate(['/'+this.quizId+'/start'])
        }
      }
    )
  }

}
