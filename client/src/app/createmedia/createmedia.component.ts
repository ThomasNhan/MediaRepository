import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Media } from "../media";

@Component({
  selector: "app-createmedia",
  templateUrl: "./createmedia.component.html",
  styleUrls: ["./createmedia.component.css"]
})
export class CreatemediaComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {}
  confirmation: string;

  mediaForm = this.fb.group({
    title: new FormControl(""),
    author: new FormControl(""),
    publisher: new FormControl(""),
    datepublished: new FormControl(""),
    comment: new FormControl(""),
    media: new FormControl(null),
    url: new FormControl(null),
    mediaType: new FormControl(""),
    fileName: new FormControl("")
  });

  ngOnInit() {}

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.mediaForm.patchValue({
          media: reader.result,
          mediaType: file.type,
          fileName: file.name
        });
      };
      this.api.uploadMedia(event.target.files);
    }
  }

  submit(media: Media, isValid: boolean) {
    this.api.createMedia(media).subscribe(res => {
      const val = res;
    });

    //Save file locally

    this.confirmation = "File Created Successfully!";
    this.mediaForm.reset();
  }
}
