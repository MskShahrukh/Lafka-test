import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WebHttpService {
  readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  post(route: string, data: any) {
    return this.http.post(this.apiUrl + route, data);
  }

  get(route: string, param: string, data: string) {
    return this.http.get(this.apiUrl + route, {
      params: new HttpParams().set(param, data)
    });
  }
}
