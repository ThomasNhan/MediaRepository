import { Component } from "@angular/core";
import { LoginService } from "./api.login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private auth: LoginService, private router: Router) {}
  title = "client";

  logOut() {
    this.auth.logout();
    this.router.navigateByUrl("/home");
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isLoggedOut() {
    return this.auth.isLoggedOut();
  }
}
