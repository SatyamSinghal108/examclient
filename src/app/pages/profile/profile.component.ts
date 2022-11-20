import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any=null

  constructor(private login:LoginService) { }

  ngOnInit(): void {

     this.user=this.login.getUser();
    // this.user=this.login.getCurrentUser().subscribe(
    //   (data:any)=>{
    //     this.user=data;
    //   },
    //   (error)=>{
    //     alert(error);
    //   }
    // )
  }

}
