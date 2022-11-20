import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseURL from 'src/environments/helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //get the current user: which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseURL}/current-user`);
  }

  // generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseURL}/generate-token`, loginData)
  }

  // storing token in localfile on login
  public loginUser(token: any) {
    localStorage.setItem("token", token);
    // this.loginStatusSubject.next(true);
    return true;
  }

  // isLogin: user Loggedin or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token");
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) { return false; }
    else { return true; }
  }

  // Logged out:remove token from storage local
  public logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem("token")
  }

  //set User Details
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  // getting user details
  public getUser() {
    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  // user roles
  public getUserRole(){
    let user=this.getUser();
    // return user.authorities;
    return user.authorities[0].authority;
  }
}
