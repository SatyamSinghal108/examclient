import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseURL from 'src/environments/helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load all category
  public category(){
    return this._http.get(`${baseURL}/category/`);
  }

  //add category
  public addCategory(category:any){
    return this._http.post(`${baseURL}/category/`,category);
  }

  public delCategory(id: Number): Observable<any>{
    return this._http.delete(`${baseURL}/category/${id}`);
  }

  public updateCategory(category:any){
    return this._http.put(`${baseURL}/category/`,category);
  }
}
