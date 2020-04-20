import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Login } from "./models/Login";
import * as moment from "moment";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  apiURL: string = "http://localhost:3333/users";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    observe: "response" as "body",
  };

  public login(loginInfo: Login) {
    var formData: any = new FormData();
    var json = JSON.stringify(loginInfo);
    formData.append("email", loginInfo.email);
    formData.append("password", loginInfo.password);

    return this.httpClient
      .post(`${this.apiURL}/login`, json, this.httpOptions)
      .pipe(
        map((res) => {
          this.setSession(res);
        })
      );
  }

  public register(userInfo: Login) {
    var formData: any = new FormData();
    var json = JSON.stringify(userInfo);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);

    return this.httpClient.post(
      `${this.apiURL}/register`,
      json,
      this.httpOptions
    );
  }

  private setSession(authResult) {
    const decodedValue = jwt_decode(authResult.body.loginToken);
    const expiresAt = moment().add(decodedValue.expiresIn, "second");
    const email = decodedValue.subject;

    console.log("email", email);
    console.log("expiresAt", expiresAt);

    localStorage.setItem("id_token", email);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

  public getAuthEmail() {
    return localStorage.getItem("id_token");
  }

  private getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
