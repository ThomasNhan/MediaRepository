import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { MediaComponent } from "./media/media.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "repository", component: MediaComponent },
  { path: "create", component: CreatemediaComponent },
  { path: "contacts", component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
