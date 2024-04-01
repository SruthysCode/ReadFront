import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  APIBaseUrl: string = environment.APIBASEURL + 'admin/';

  constructor(private http: HttpClient) {}

  Login(details: any) {
    return this.http.post(this.APIBaseUrl + `adminlogin/`, { details });
  }

  GetAdminDetails() {
    const details = this.http.get(this.APIBaseUrl + `adminname/`, {
      withCredentials: true,
    });
    return details;
  }

  GetMentorDetails(id: string) {
    return this.http.get(this.APIBaseUrl + `getmentor/${id}`, {
      withCredentials: true,
    });
  }

  GetStudentDetails(id: string) {
    return this.http.get(this.APIBaseUrl + `getstudent/${id}`, {
      withCredentials: true,
    });
  }

  EditStudent(details: any) {
    return this.http.post(this.APIBaseUrl + `editstudent/`, { details });
  }

  EditMentor(details: any) {
    return this.http.post(this.APIBaseUrl + `editmentor/`, { details });
  }
  DeleteMentor(id: Object) {
    return this.http.post(this.APIBaseUrl + `deletementor/`, { id });
  }

  DeleteStudent(id: Object) {
    return this.http.post(this.APIBaseUrl + `deletestudent/`, { id });
  }

  AccessMentor(id: string) {
    return this.http.post(this.APIBaseUrl + `accessmentor`, { id });
  }

  GetMentorsByCount(page: number, limit: number) {
    return this.http.get(
      this.APIBaseUrl + `getmentors?page=${page}&limit=${limit}`
    );
  }
  
  GetCounts() {
    return this.http.get(
      this.APIBaseUrl + `getcounts`
    );
  }

}
