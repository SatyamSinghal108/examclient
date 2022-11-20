import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryService } from '../view-categories/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  Category:any={
    cid: '',
    title:'',
    description:''
  }
  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data:any){

      this.Category.cid=data.id;
      this.Category.title=data.title;
      this.Category.description=data.description;
    }

  ngOnInit(): void {
  }

  update(){

    this.categoryService.updateCategory(this.Category).subscribe((data:any)=>{
      this.Category=data;
      console.log(this.Category);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data from server",'error')
    })
  }

  close(){
    window.location.reload()
    this.dialogRef.close();
  }

}
