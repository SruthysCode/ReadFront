import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Chatmsg } from '../Model/chatModel';


@Injectable({
  providedIn: 'root',
})
export class MentorService {
  APIBaseUrl: string = environment.APIBASEURL + `mentor/`;

  constructor(private http: HttpClient,
              
    ) {}

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitMentor(name: string, image: string) {
    console.log(name, image);
    this.observer.next({ name, image });
  }

  GetMentors() {
    return this.http.get(this.APIBaseUrl + 'mentorslist');
  }

  LoadProfile() {
    return this.http.get(this.APIBaseUrl + 'mentorname');
  }

  getmentorprofile(id: string) {
    console.log('Going to ', this.APIBaseUrl + `getmentorprofile/${id}`);
    return this.http.get(this.APIBaseUrl + `getmentorprofile/${id}`);
  }

  updateMentorDetails(updatedData: any): Observable<any> {
    console.log('up ', updatedData, this.APIBaseUrl);
    return this.http.put(this.APIBaseUrl + `editmentor`, { updatedData });
  }

  UploadImage(formData: FormData) {
    console.log(formData);

    const headers = new HttpHeaders();
    headers.append(
      'Content-Type',
      'multipart/form-data; boundary=---------------------------974767299852498929531610575'
    );
    return this.http.post(this.APIBaseUrl + `upload-single`, formData, {
      headers,
    });
  }

  ChangePassword(password: string) {
    return this.http.post(this.APIBaseUrl + 'changepassword', { password });
  }

  checkForRoomID(studentID: object) {
    console.log('men', studentID);
    return this.http.get(this.APIBaseUrl + `checkforroomid/${studentID}`);
  }

  storeMessage(msg: Chatmsg) {
    console.log('storemsg ', msg);
    return this.http.post(this.APIBaseUrl + `storechatmessage`, { msg });
  }

//   onlineStatus() {
//     this.chatservice.online().subscribe((mentorID: string) => {
//         // Update the online status of the mentor in your component
//         console.log('Mentor is online: ', mentorID);
//         // Add logic to update the online status of the mentor
//     });
// }


}
