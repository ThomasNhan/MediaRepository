import { Component, OnInit } from "@angular/core";
import { MatFormField } from "@angular/material/form-field";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { ILogin } from "./ILogin";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {}

  loginForm = this.fb.group({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  login(loginInfo: ILogin, isValid: boolean) {
    console.log(loginInfo);
    if (this.loginForm.valid) {
      this.api.login(loginInfo).subscribe(res => {
        const val = res;
        console.log(val);
      });
    } else {
      console.log("Required fields are missing");
    }
  }

  ngOnInit(): void {}
}
