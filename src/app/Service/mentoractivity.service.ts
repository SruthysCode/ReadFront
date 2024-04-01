import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Book, Todo } from '../Model/activityModel';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MentoractivityService {
  APIBaseUrl: string = environment.APIBASEURL + `mentor/`;

  constructor(private http: HttpClient) {}

  uploadBook(formData: FormData): Observable<any> {
    console.log('uploadbook', formData);

    return this.http.post(this.APIBaseUrl + `upload-book`, formData);
  }

  uploadToDo(formData: FormData): Observable<any> {
    console.log('uploadtodo', formData);
    return this.http.post(this.APIBaseUrl + `upload-todo`, formData);
  }

  getCurrentBook(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `currentbook `);
  }

  checkDate(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `checkDate `);
  }

  checkDateBook(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `checkDateBook `);
  }

  GetBlog(): Observable<any> {
    return this.http.get(this.APIBaseUrl + `mentorblog`);
  }

  
  UpdateLikes(activityID : string, likes: number, mentorName : string): Observable<any>{
    return this.http.patch(this.APIBaseUrl + `updatelikes`,{activityID,likes, mentorName});  
  }

  UpdateComment(activityID : string, comment : string, mentorName : string): Observable<any>{
    console.log(comment,"cm , nam ", mentorName)
    return this.http.patch(this.APIBaseUrl + `updatecomment`,{activityID,comment, mentorName});  
  }


  GetActivities(): Observable<any> {
    
    return this.http.get(this.APIBaseUrl + `getactivity`);
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  UpdateMark(activityID : string ,mark: number): Observable<any>{
    return this.http.put(this.APIBaseUrl + `updatemark`,{activityID,mark});
    
  }

  checkTimeForRankList() : Observable<any>{
    return this.http.get(this.APIBaseUrl + `checktimeforrank`);   
  }

  RankList() : Observable<any>{
    
    return this.http.get(this.APIBaseUrl + `getranklist`);
  }

  GenerateRank(todoID : object) : Observable<any>{
    
    return this.http.get(this.APIBaseUrl + `generaterank/${todoID}`);
  }

  FinalRank() : Observable<any>{
    
    return this.http.get(this.APIBaseUrl + `finalrank`);
  }

  DisplayActivity() :  Observable<any>{
    
    return this.http.get(this.APIBaseUrl + `displayactivity`);
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }    
    Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
    });
    console.error(errorMessage);
    return throwError(errorMessage);
}

}
