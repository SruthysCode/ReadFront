import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Book } from '../Model/activityModel';

@Injectable({
  providedIn: 'root',
})
export class StudentactivityService {
  APIBaseUrl: string = environment.APIBASEURL + `student/`;

  constructor(private http: HttpClient) {}

  // checkDate(): Observable<any>{
  //   return this.http.get(this.APIBaseUrl + `checkDate `);
  // }

  bookCheck(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `checkbook`);
  }

  getActivity(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `currentactivity`);
  }

  uploadActivity(formData: FormData): Observable<any> {
    return this.http.post(this.APIBaseUrl + `postactivity`, formData);
  }

  CheckPosted(activityID: object): Observable<any> {
    return this.http.get(this.APIBaseUrl + `checkactivity/${activityID}`);
  }
  GetActivities(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `activities`);
  }
  GetBlog(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `blog`);
  }

  UpdateLikes(activityID : string, likes: number, studentName : string): Observable<any>{
    return this.http.patch(this.APIBaseUrl + `updatelikes`,{activityID,likes, studentName});  
  }

  UpdateComment(activityID : string, comment : string, studentName : string): Observable<any>{
    return this.http.patch(this.APIBaseUrl + `updatecomment`,{activityID,comment, studentName});  
  }

  GetBooks(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `getbooks`);
  }
}
