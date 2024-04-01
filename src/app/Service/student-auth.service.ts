import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Login, LoginResponse, SignUp } from '../Model/authModel';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentAuthService {
  APIBaseUrl: string = environment.APIBASEURL + 'student/';

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.GetRefreshToken();
    });
  }

  public $refreshToken = new Subject<boolean>();

  Login(loginDetails: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.APIBaseUrl + `login`,
      loginDetails
    );
  }

  GetRefreshToken() {    
    const studentRefreshToken = localStorage.getItem('student_refreshToken');
     this.http.post(
      this.APIBaseUrl + `studentrefreshtoken`,
      {studentRefreshToken}
    ).subscribe((res : any)=>{    
      localStorage.setItem('student_token', res.token);            
    })

  }

  SignUp(signupDetails: SignUp): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.APIBaseUrl + `signup`,
      signupDetails
    );
  }

  ForgotPassword(email: string) {
    return this.http.post(this.APIBaseUrl + `forgotpassword`, { email });
  }

  Otp(student_detail: any) {
    return this.http.post(this.APIBaseUrl + 'otp', { student_detail });
  }

  OtpVerify(otp_detail: any) {
    return this.http.post(this.APIBaseUrl + 'otp/verify', { otp_detail });
  }
}
