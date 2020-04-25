import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { MediaComponent } from "./media/media.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from './helpers/authguard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "repository", component: MediaComponent, canActivate: [AuthGuard] },
  { path: "create", component: CreatemediaComponent, canActivate: [AuthGuard] },
  { path: "contacts", component: ContactComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
