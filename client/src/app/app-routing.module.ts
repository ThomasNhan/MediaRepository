import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { MediaComponent } from "./media/media.component";
import { ContactComponent } from "./contact/contact.component";

const routes: Routes = [
  { path: "", component: MediaComponent },
  { path: "create", component: CreatemediaComponent },

  { path: "contact", component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
