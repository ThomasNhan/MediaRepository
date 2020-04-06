import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Media } from "./media";
import { ILogin } from "./login/ILogin";
import { saveAs } from "file-saver";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  apiURL: string = "http://localhost:3333";
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(private httpClient: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  public createMedia(media: Media) {
    console.log(media);
    var formData: any = new FormData();
    formData.append("title", media.title);
    formData.append("author", media.author);
    formData.append("description", media.description);
    formData.append("datePublished", media.datePublished);
    formData.append("submittedBy", "AppUser");
    formData.append("media", media.media);

    return this.httpClient.post(`${this.apiURL}/media/`, formData, {
      reportProgress: true,
      observe: "events",
    });
  }

  public updateMedia(media: Media) {}

  public deleteMedia(id: string) {}

  public getMediaById(id: string) {
    return this.httpClient.get(`${this.apiURL}/media/${id}`);
  }

  public getMedia(url?: string): Observable<any> {
    return this.httpClient
      .get(`${this.apiURL}/media`)
      .pipe(map(this.extractData));
  }

  public login(loginInfo: ILogin) {
    var formData: any = new FormData();
    formData.append("email", loginInfo.email);
    formData.append("password", loginInfo.password);
    console.log(formData);

    return this.httpClient.post(`${this.apiURL}/login`, formData);
  }
}
