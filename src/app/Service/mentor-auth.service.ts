import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Login, LoginResponse, SignUp } from '../Model/authModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MentorAuthService {
  APIBaseUrl: string = environment.APIBASEURL + 'mentor/';

  constructor(private http: HttpClient) {}

  Login(loginDetails: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.APIBaseUrl + `login`,
      loginDetails
    );
  }

  SignUp(signupDetails: SignUp): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.APIBaseUrl + `signup`,
      signupDetails
    );
  }

  ForgotPassword(email: string) {
    this.http.post(`http://localhost:3000/api/mentor/forgotpassword`, {
      email,
    });
    // return this.http.post(this.APIBaseUrl + `forgotpassword`, { email });
  }

  Otp(signup_detail: any) {
    
    return this.http.post(this.APIBaseUrl + 'otp', { signup_detail });
  }

  OtpVerify(otp_detail: any) {
    return this.http.post(this.APIBaseUrl + 'otp/verify', { otp_detail });
  }
}
