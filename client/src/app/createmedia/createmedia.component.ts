import { Component, OnInit, ViewChild, ErrorHandler } from "@angular/core";
import {
  HttpEventType,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { ApiService } from "../api.service";
import { Media } from "../media";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-createmedia",
  templateUrl: "./createmedia.component.html",
  styleUrls: ["./createmedia.component.css"],
})
export class CreatemediaComponent implements OnInit, ErrorHandler {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  @ViewChild("form") form;
  files = [];
  progress: number = 0;
  selectedFile;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}
  confirmation: string;

  mediaForm = this.fb.group({
    title: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    datePublished: new FormControl("", Validators.required),
    description: new FormControl(""),
    submittedBy: new FormControl(""),
    media: new FormControl(null, Validators.required),
    url: new FormControl(null),
    mediaType: new FormControl(""),
    fileName: new FormControl(""),
  });

  ngOnInit() {}

  public hasError = (controlName: string, errorName: string) => {
    return this.mediaForm.controls[controlName].hasError(errorName);
  };

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = file;
    this.mediaForm.patchValue({
      media: file,
      mediaType: file.type,
      fileName: file.name,
    });
    this.mediaForm.get("media").updateValueAndValidity();
  }

  handleError(error: HttpErrorResponse) {
    console.log("Error Message", error.error.message);
    return throwError(error);
  }

  submit(media: Media, isValid: boolean) {
    if (this.mediaForm.valid) {
      this.mediaForm.value.media = this.selectedFile;
      media.media = this.selectedFile;
      this.api
        .createMedia(media)
        .pipe(catchError(this.handleError))
        .subscribe(
          (event: HttpEvent<any>) => {
            console.log("Event Type:", event.type);
            switch (event.type) {
              case HttpEventType.Sent:
                console.log("Request has been made");
                break;
              case HttpEventType.ResponseHeader:
                console.log("Response header has been received");
                break;
              case HttpEventType.UploadProgress:
                this.progress = Math.round((event.loaded / event.total) * 100);
                console.log(`Uploaded', ${this.progress}%`);
                break;
              case HttpEventType.Response:
                console.log("Media successfully uploaded", event.body);
                this.snackBar.open("Medis successfully uploaded", "Success", {
                  duration: 2000,
                });
                this.form.nativeElement.reset();
                this.formDirective.resetForm();
                this.mediaForm.markAsPristine();
                this.mediaForm.markAsUntouched();
                this.mediaForm.clearValidators();
                this.mediaForm.reset();
                setTimeout(() => {
                  this.progress = 0;
                }, 1500);
            }
          },
          (error) => {
            console.log("Subscribe error", error.error.message);
            this.snackBar.open(error.error.message, "Failed", {
              duration: 2000,
            });
          }
        );
    } else {
      if (!this.selectedFile) {
        this.snackBar.open("Please select a file to upload", "Failed", {
          duration: 2000,
        });
      } else {
        this.snackBar.open("Required Fields are missing", "Failed", {
          duration: 2000,
        });
      }
    }
  }
}
