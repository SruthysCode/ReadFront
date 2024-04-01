import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminactivityService {
  APIBaseUrl: string = environment.APIBASEURL + `admin/`;

  constructor(private http: HttpClient) {}

  GetBlog(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `blog`);
  }

  block(activityID: string): Observable<any> {
    return this.http.put(this.APIBaseUrl + `blockactivity`, { activityID });
  }

  unblock(activityID: string): Observable<any> {
    return this.http.put(this.APIBaseUrl + `unblockactivity`, { activityID });
  }
}
