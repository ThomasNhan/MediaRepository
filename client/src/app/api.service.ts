import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Media } from "./media";
import { saveAs } from "file-saver";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiURL: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  public createMedia(media: Media) {
    console.log(media);
    var formData: any = new FormData();
    formData.append("title", media.title);
    formData.append("author", media.author);
    formData.append("publisher", media.publisher);
    formData.append("description", media.comment);
    formData.append("media", media.media);

    return this.httpClient.post(`${this.apiURL}/media/`, formData);
  }

  public updateMedia(media: Media) {}

  public deleteMedia(id: string) {}

  public getMediaById(id: string) {
    return this.httpClient.get(`${this.apiURL}/media/${id}`);
  }

  public getMedia(url?: string) {
    return this.httpClient.get<Media[]>(`${this.apiURL}/media`);
  }
}
