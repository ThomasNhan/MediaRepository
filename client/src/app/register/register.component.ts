import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import {
  HttpEventType,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { LoginService } from "../api.login.service";
import { Login } from "../models/Login";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("form") form;
  constructor(
    private fb: FormBuilder,
    private api: LoginService,
    private snackBar: MatSnackBar
  ) {}

  userForm = this.fb.group({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });
  ngOnInit(): void {}

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  };

  handleError(error: HttpErrorResponse) {
    console.log("Error Message", error.error.message);
    return throwError(error);
  }

  submit(user: Login, isValid: boolean) {
    if (this.userForm.valid) {
      this.api
        .register(user)
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
                console.log("Media successfully uploaded", event.body);
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
        );
    }
  }
}
