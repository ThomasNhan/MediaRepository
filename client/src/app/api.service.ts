import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Media } from "./media";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  apiURL: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

  public createMedia(media: Media) {
    return this.httpClient.post(`${this.apiURL}/media/`, media);
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
