import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user={
    username:'',
    password:'',
    name:'',
    emailId:'',
    number:'',
  };

  constructor(private userService:UserService, private snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }
  
  formSubmit():void{
           console.log(this.user);
           if(this.user.username==null ||this.user.username==''){
                this.snackBar.open("Username is required !!","",{
                  duration:2000,
                });
            //  alert("user is required");
             return;
           }

           this.userService.addUser(this.user).subscribe(
             (data:any)=>{
               //success
                console.log(data);

                this.router.navigate([''])
                Swal.fire("User Registered Successfully!!","User ID - "+data.id,'success');
             },
             (error)=>{
               console.log(error);
               this.snackBar.open("Something is wrong !!","",{
                duration:2000,
              });
             }
           )
  }

  clear(){
    this.user.emailId=""
    this.user.name=""
    this.user.number=""
    this.user.password=""
    this.user.username=""
  }
}
