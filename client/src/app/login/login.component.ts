import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import {
  HttpEventType,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { LoginService } from "../api.login.service";
import { Login } from "../models/Login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private api: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  loginForm = this.fb.group({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  handleError(error: HttpErrorResponse) {
    console.log("Error Message", error.error.message);
    return throwError(error);
  }

  login(loginInfo: Login, isValid: boolean) {
    if (this.loginForm.valid) {      
      this.api.login(loginInfo)
        .pipe(catchError(this.handleError))
        .subscribe(         
          (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made");
                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received");
                break;
              case HttpEventType.UploadProgress:
                break;
              case HttpEventType.Response:
                this.snackBar.open("User successfully logged in", "Success", {
                  duration: 2000,
                });
                this.router.navigate([this.returnUrl]);
            }
          },
          (error) => {
            this.snackBar.open(error.error.message, "Failed", {
              duration: 2000,
            });
          }
      );
    }
  }
}


/*

 map((res) => {
            this.api.setSession(res);
          }),

  (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request has been made");
              break;
            case HttpEventType.ResponseHeader:
              console.log("Response header has been received");
              break;
            case HttpEventType.UploadProgress:
              break;
            case HttpEventType.Response:
              this.snackBar.open("User successfully registered", "Success", {
                duration: 2000,
              });
          }
        },
        (error) => {
          this.snackBar.open(error.error.message, "Failed", {
            duration: 2000,
          });
        }
*/