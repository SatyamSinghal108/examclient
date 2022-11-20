import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { CategoryService } from '../view-categories/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category=
    {title:'',
    description:''};
  constructor(private categoryService:CategoryService, private snackbar:MatSnackBar) { }

  ngOnInit(): void {

  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this.snackbar.open("Title Required !!",'',{
        duration:3000,
      });
      return;
    }
     if( this.category.description.trim()=='' || this.category.description==null)
    {
      this.snackbar.open("Description Required !!",'',{
        duration:3000,
      });
      return;
    }

    this.categoryService.addCategory(this.category).subscribe((data:any)=>{
      console.log(data)
      Swal.fire("Success !!","Category Added Successfully",'success')
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error occurred at server",'error')
    })
  }

}
