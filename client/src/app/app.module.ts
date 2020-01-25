import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MediaComponent } from "./media/media.component";
import { CreatemediaComponent } from "./createmedia/createmedia.component";
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [AppComponent, MediaComponent, CreatemediaComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
