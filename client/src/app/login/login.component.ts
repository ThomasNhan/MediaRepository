import { Component, OnInit } from "@angular/core";
import { MatFormField } from "@angular/material/form-field";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../api.login.service";
import { Login } from "../models/Login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private api: LoginService
  ) {}

  loginForm = this.fb.group({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  login(loginInfo: Login, isValid: boolean) {
    console.log("Login info from component", loginInfo);
    if (this.loginForm.valid) {
      this.api.login(loginInfo).subscribe((res) => {
        const val = res;
        this.snackBar.open("Login Successful", "Failed", {
          duration: 2000,
        });
      });
    } else {
      console.log("Required fields are missing");
    }
  }

  ngOnInit(): void {}
}
