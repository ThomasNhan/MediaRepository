import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ApiService } from "../api.service";
import { Media } from "../media";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-createmedia",
  templateUrl: "./createmedia.component.html",
  styleUrls: ["./createmedia.component.css"]
})
export class CreatemediaComponent implements OnInit {
  progress = 0;
  selectedFile;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private http: HttpClient
  ) {}
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
    // let reader = new FileReader();
    // if (event.target.files && event.target.files.length) {
    //   console.log("upload file");
    //   const [file] = event.target.files;

    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     console.log(reader.result);
    //     this.mediaForm.patchValue({
    //       media: reader.result,
    //       mediaType: file.type,
    //       fileName: file.name
    //     });
    //   };
    //}
    this.selectedFile = event.target.files[0];
  }

  submit(media: Media, isValid: boolean) {
    this.mediaForm.value.media = this.selectedFile;
    media.media = this.selectedFile;
    media.mediaType = this.selectedFile.type;
    media.fileName = this.selectedFile.name;
    this.api.createMedia(media).subscribe(res => {
      const val = res;
    });

    this.confirmation = "File Created Successfully!";
    this.mediaForm.reset();
  }
}
