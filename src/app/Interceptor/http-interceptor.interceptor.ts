import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StudentAuthService } from '../Service/student-auth.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  studentauthservice = inject(StudentAuthService);
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const studentToken = localStorage.getItem('student_token');
    const mentorToken = localStorage.getItem('mentor_token');
    const adminToken = localStorage.getItem('admin_token');
    if (studentToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${studentToken}`),
      });
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log("errreeoooe rrr :: ", error.message, error.status)
          if (error.status === 500) {
            const isRefresh = confirm(
              'Your Session has expired!. Do you wish to continue?'
            );
            if (isRefresh) {
              this.studentauthservice.$refreshToken.next(true);
            }
          }
          return throwError(error);
        })
      );
    }
    if (mentorToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${mentorToken}`),
      });
      return next.handle(newRequest);
    }
    if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${adminToken}`),
      });
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
