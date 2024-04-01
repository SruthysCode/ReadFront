import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router ,
    private toastr:ToastrService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error(error.message);
          Swal.fire('Error', "Sorry ! Some Error Encountered", 'error');
           this.router.navigate(['error'],
             {
              queryParams: { code: error.status },
            });     

          if (error.status === 404) {
            this.toastr.error(error.message);
            // this.router.navigate(['error'],
            //  {
            //   queryParams: { code: '404' },
            // });
            this.router.navigate(['/error'])
          } else if(error.status === 500) {
            this.toastr.error(error.message);
            this.router.navigate(['/error'])
         
            // this.router.navigate(['/error'],
            //  {
            //   queryParams: { code: '500' },
            // });
          }
        } 
        
        return throwError(error);
      })
    );;
  }
}
