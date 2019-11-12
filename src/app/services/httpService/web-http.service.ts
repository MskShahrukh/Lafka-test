import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WebHttpService {
  constructor(private http: HttpClient) {}

  readonly apiUrl: string = environment.apiUrl;

  post(route: string, data: any) {
    return new Observable(subscriber => {
      this.http.post(this.apiUrl + route, data).subscribe((data: any) => {
        subscriber.next(data);
      });
    });
  }

  get(route: string, param: string, data: string) {
    return new Observable(subscriber => {
      this.http
        .get(this.apiUrl + route, {
          params: new HttpParams().set(param, data)
        })
        .subscribe((data: any) => {
          subscriber.next(data);
        });
    });
  }
}
