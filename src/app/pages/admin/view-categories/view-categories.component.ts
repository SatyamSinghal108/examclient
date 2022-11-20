import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any;
  num:Number;
  
  constructor(private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.categoryService.category().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data from server",'error')
    })
  }

  delete(i:any){

    Swal.fire({
      icon:'info',
      title:"Are You Sure?",
      confirmButtonText:"Confirm",
      cancelButtonText:"Cancel",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoryService.delCategory(i).subscribe(
      (data)=>{
        this.categories=this.categories.filter((category:any)=>category.cid!=i)
        Swal.fire("Success","Successfully Deleted","success")
      },
      (error)=>{
        Swal.fire("Error","Server Error","error")
      }
    )
      }
    })

  }

  update(i:any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data= {
      id: this.categories[i].cid,
      title:this.categories[i].title,
      description:this.categories[i].description
  };
    const dialogRef = this.dialog.open(UpdateCategoryComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      window.location.reload();
    });
  }
}
