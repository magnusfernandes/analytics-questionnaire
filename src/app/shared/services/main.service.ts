import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  public data: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _http: HttpClient) {}

  publishData(body: any) {
    this._http
      .post(`${environment.baseUrl}/entries/publish`, body)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  fetchData(userId: string) {
    this._http
      .get(`${environment.baseUrl}/entries/${userId}`)
      .subscribe((resp: any) => this.data.next(resp.message));
  }
}
