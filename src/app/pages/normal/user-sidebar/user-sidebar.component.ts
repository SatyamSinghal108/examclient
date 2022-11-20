import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../admin/view-categories/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories:any;
  constructor(private _category:CategoryService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {

    this._category.category().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        console.log(error)
        this.snackbar.open("Error in loading !!",'',{
          duration:3000
        })
      }
    )
  }

}
