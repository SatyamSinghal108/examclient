import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar, private ls: LoginService, private router:Router) { }

  ngOnInit(): void {
  } 

  formSubmit() {
    // localStorage.setItem("current",this.ls.getUser())
    // console.log("Logging in.... ")
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required!!", '', {
        duration: 3000,
      })
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required!!", '', {
        duration: 3000,
      })
      return;
    }

    // Request to server to generate token

    this.ls.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Success")
        // console.log(data)

        this.ls.loginUser(data.token)

        this.ls.getCurrentUser().subscribe(
          (user: any) => {
            this.ls.setUser(user)
            console.log(user)

            //redirect.... ADMIN => Admin dashboard
            if(this.ls.getUserRole()=="ADMIN"){
              // window.nav='/admin-dashboard';
              this.router.navigate(['admin-dashboard'])
              this.ls.loginStatusSubject.next(true);
            }
            //redirect.... NORMAL => Normal dashboard
            else if(this.ls.getUserRole()=="NORMAL"){
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard'])
              this.ls.loginStatusSubject.next(true);
            }
            else{
              this.ls.logout();
              // location.reload();
            }
          }
        )
      },
      (error) => {
        console.log("error")
        console.log(error)
        this.snack.open("Invalid User !! Try Again",'',{duration:3000})
      }
    )

  }

  clear() {
    this.loginData.password = ""
    this.loginData.username = ""
  }
}
