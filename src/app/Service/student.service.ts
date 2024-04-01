import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Students } from '../Model/studentModel';
import { Chatmsg } from '../Model/chatModel';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  APIBaseUrl: string = environment.APIBASEURL + 'student/';

  private studentNameSource = new BehaviorSubject<string>('');
  currentStudentName = this.studentNameSource.asObservable();

  constructor(private http: HttpClient) {}

  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitName(name: string, image: string) {
    this.observer.next({ name, image });
  }

  changeStudentName(name: string) {
    console.log('std service ', name);
    this.studentNameSource.next(name);
  }

  LoadProfile() {
    const profileData = this.http.get(this.APIBaseUrl + `studentname`);
    // console.log(profileData,'profiledata from service');
    return profileData;
  }

  GetStudents() {
    console.log('in get Student list ....');
    return this.http.get<Students[]>(this.APIBaseUrl + 'studentslist');
  }

  GetStudentsByCount(page: number, limit: number) {
    return this.http.get(
      this.APIBaseUrl + `getstudents?page=${page}&limit=${limit}`
    );
  }

  ChangePassword(password: string) {
    return this.http.post(this.APIBaseUrl + 'changepassword', { password });
  }

  Access(id: string) {
    
    return this.http.post(this.APIBaseUrl + `access`, { id });
  }

  Edit(student: any) {
    return this.http.post(this.APIBaseUrl + `editprofile`, { student });
  }

  uploadimage(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append(
      'Content-Type',
      'multipart/form-data; boundary=---------------------------974767299852498929531610575'
    );
    return this.http.post(this.APIBaseUrl + `upload-single`, formData, {
      headers,
    });
  }

  getImages() {
    return this.http.get(this.APIBaseUrl + `getActivities`);
  }

  checkForRoomID(mentorID: string) {
    
    return this.http.get(this.APIBaseUrl + `checkforroomid/${mentorID}`);
  }

  storeMessage(msg: Chatmsg) {
    
    return this.http.post(this.APIBaseUrl + `storechatmessage`, { msg });
  }

  // online availability check
  //   onlineStatus() {
  //     this.chatservice.online().subscribe((studentID: string) => {
  //         // Update the online status of the student in your component
  //         console.log('Student is online: ', studentID);
  //         // Add logic to update the online status of the student
  //     });
  // }

  notifyOnline() {
    return this.http.get(this.APIBaseUrl + 'notifyonline');
  }

  GetNotifications(){
    return this.http.get(this.APIBaseUrl + 'allnotifications');
  
  }
  UpdateNotifications(){
    return this.http.put(this.APIBaseUrl + 'updatenotifications',{read : false});
  
  }

  
  CHECK(){
    return this.http.get(this.APIBaseUrl + 'check');
  
  }

}
