import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Media } from "../media";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.css"]
})
export class MediaComponent implements OnInit {
  mediaList: Media[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getMedia().subscribe(res => {
      this.mediaList = res;
    });
  }
}
