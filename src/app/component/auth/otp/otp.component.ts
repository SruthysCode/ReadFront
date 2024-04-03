import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { MentorAuthService } from 'src/app/Service/mentor-auth.service';
import { StudentAuthService } from 'src/app/Service/student-auth.service';
import { Role } from 'src/app/enum/role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent  implements OnInit{
  role : string='';
  
  form: FormGroup = new FormGroup({});
  time: number = 60;
  timer: number = this.time;
  showResendButton: boolean = false;
  showVerifyButton: boolean = true;
  resendCount: number = 3;

  private countdownSub!: Subscription;

  constructor(
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentauth : StudentAuthService,
    private mentorauth : MentorAuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.role = params['role'];
    });

    this.GenerateOtp();
  }

  GenerateOtp() {
    const mail = localStorage.getItem('mail');
    this.form = this.formBuilder.group({
      otp: ['', [Validators.required]],
      email: [mail, [Validators.required, Validators.email]],
    });

    let signup_detail = {
      email: mail,
      isverified: false,
    };
    if(this.role==Role.Student)
    {
   
    this.studentauth.Otp(signup_detail).subscribe(
      (res: any) => {},
      (err: { error: { message: string | undefined } }) => {
        Swal.fire('Error', err.error.message, 'error');
      }
    );
    }
    else
    if(this.role==Role.Mentor)
    {
      this.mentorauth.Otp(signup_detail).subscribe(
        (res: any) => {},
        (err: { error: { message: string | undefined } }) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
     
    }

    this.timer = this.time;
    this.startTimer();

    this.showResendButton = false;
    this.showVerifyButton = true;
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  verifyotp() {
    if (this.form.valid) {
      let verifyotp = this.form.getRawValue();
      let otp_verify = {
        email: localStorage.getItem('mail'),
        otp: verifyotp.otp,
      };
      if(this.role==Role.Student)
      {
     
      this.studentauth.OtpVerify(otp_verify).subscribe(
        (res: any) => {
          // this.router.navigate(['student/studentlogin']);// student homepage
          this.router.navigate(['/auth/login', { role: Role.Student }]);
 
        },
        (err: { error: { message: string | undefined } }) => {
          Swal.fire('Error', err.error.message, 'error');
        }
      );
      }
      else
      if(this.role==Role.Mentor)
      {
        this.mentorauth.OtpVerify(otp_verify).subscribe(
          (res: any) => {
            // this.router.navigate(['/auth/login;role=mentor']);// to mentor homepage
            this.router.navigate(['/auth/login', { role: Role.Mentor }]);
 
          },
          (err: { error: { message: string | undefined } }) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
        
      }  
    }
  }

  resendOTP() {
    //  OTP resend
    this.GenerateOtp();
    this.resendCount--;
  }

  startTimer() {
    const source = timer(1000, 1000);
    this.countdownSub = source.subscribe(() => {
      this.timer--;
      if (this.timer <= 0) {
        if (this.resendCount === 0) {
          this.showResendButton = false;
          Swal.fire('Hey user!', 'You have attempted maximum time!', 'info');

          this.resendCount = -1;
          this.router.navigate(['']);
        } else {
          this.showResendButton = true;
          this.showVerifyButton = false;
          this.countdownSub.unsubscribe();
        }
      }
    });
  }


}
