import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Role } from '../../../enum/role.enum';
import { StudentAuthService } from 'src/app/Service/student-auth.service';
import { MentorAuthService } from 'src/app/Service/mentor-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription | undefined;
  private studentLoginSubscription: Subscription | undefined;
  private mentorLoginSubscription: Subscription | undefined;
  form: FormGroup = new FormGroup({});

  role: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private studentauth: StudentAuthService,
    private mentorauth: MentorAuthService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.role = params['role'];
    });

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    let isLoggedIn = localStorage.getItem('isStudentLoggedIn');

    if (isLoggedIn) {
      this.router.navigate(['student/']);
    }

    isLoggedIn = localStorage.getItem('isMentorLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['mentor/']);
    }
  }

  get f() {
    return this.form.controls;
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit(): void {
    let loginDetails = this.form.getRawValue();
    if (loginDetails.email == '' || loginDetails.password == '') {
      Swal.fire('Please enter all the fields', 'Warning!');
    } else if (this.hasFormErrors(this.form)) {
      Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
    } else {
      loginDetails = this.form.getRawValue();

      if (this.role == Role.Student) {
        this.studentLoginSubscription = this.studentauth
          .Login(loginDetails)
          .subscribe(
            (res: any) => {
              localStorage.setItem('isStudentLoggedIn', 'true');
              localStorage.setItem('student_token', res.token);
              localStorage.setItem('student_refreshToken', res.refreshToken);
              
              this.router.navigate(['/student/']);
            },
            (err: { error: { message: string | undefined } }) => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
      } else if (this.role == Role.Mentor) {
        this.mentorLoginSubscription = this.mentorauth
          .Login(loginDetails)
          .subscribe(
            (res: any) => {
              localStorage.setItem('isMentorLoggedIn', 'true');
              localStorage.setItem('mentor_token', res.token);
              localStorage.setItem('mentor_refreshToken', res.refreshToken);
           
              this.router.navigate(['/mentor/']);
            },
            (err: { error: { message: string | undefined } }) => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
      }
    }
  }

  signup() {
    if (this.role == Role.Student) {
      console.log('in sts signup');
      this.router.navigate(['/auth/signup', { role: Role.Student }]);
    }
    if (this.role == Role.Mentor) {
      console.log('in M sign');
      this.router.navigate(['/auth/signup', { role: Role.Mentor }]);
    }
  }

  forgot() {
    if (this.role == Role.Student) {
      console.log('in sts 4got');
      this.router.navigate(['auth/forgot', { role: this.role }]);
    }
    if (this.role == Role.Mentor) {
      console.log('in m 4got');
      this.router.navigate(['auth/forgot', { role: Role.Mentor }]);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.studentLoginSubscription) {
      this.studentLoginSubscription.unsubscribe();
    }
    if (this.mentorLoginSubscription) {
      this.mentorLoginSubscription.unsubscribe();
    }
  }
}
