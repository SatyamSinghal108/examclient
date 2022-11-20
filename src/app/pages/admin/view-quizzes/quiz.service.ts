import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from 'src/environments/helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //get all quizzes
  public quizzes(){
    return this._http.get(`${baseURL}/quiz/`);
  }

  //get quiz by qid
  public quizById(qid:any){
    return this._http.get(`${baseURL}/quiz/${qid}`);
  }

  public addQuiz(quiz:any){
    return this._http.post(`${baseURL}/quiz/`,quiz);
  }

  public deleteQuiz(qid:any){
    return this._http.delete(`${baseURL}/quiz/${qid}`);
  }

  public updateQuiz(quiz:any){
    return this._http.put(`${baseURL}/quiz/`,quiz)
  }

  public getQuizzesByCategory(cid:any){
    return this._http.get(`${baseURL}/quiz/category/${cid}`)
  }

  public getActiveQuizzes(){
    return this._http.get(`${baseURL}/quiz/active`);
  }

  public getActiveQuizByCategory(cid:any){
    return this._http.get(`${baseURL}/quiz/category/active/${cid}`);
  }
}
