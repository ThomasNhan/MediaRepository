import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { MediaComponent } from "./media/media.component";

const routes: Routes = [
  { path: "create", component: CreatemediaComponent },
  { path: "list", component: MediaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
