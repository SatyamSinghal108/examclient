import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from 'src/environments/helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public questions(qid:any){
    return this._http.get(`${baseURL}/questions/quiz/${qid}`)
  }

  public questionsAll(qid:any){
    return this._http.get(`${baseURL}/questions/quiz/all/${qid}`)
  }

  public addQuestion(question:any){
    return this._http.post(`${baseURL}/questions/`,question)
  }

  public deleteQuestion(qid:any){
    return this._http.delete(`${baseURL}/questions/${qid}`)
  }

  public evalQuiz(question:any){
    return this._http.post(`${baseURL}/questions/eval-quiz`,question)
  }
}
