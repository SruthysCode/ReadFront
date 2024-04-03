import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from 'src/app/Service/mentor-auth.service';
import { StudentAuthService } from 'src/app/Service/student-auth.service';
import { Role } from 'src/app/enum/role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  

  form: FormGroup = new FormGroup({});

  role : string='';
  constructor(
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                private http: HttpClient,
                private router: Router,
                private studentauth : StudentAuthService,
                private mentorauth : MentorAuthService,
              
              ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.role = params['role'];   
    });

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
    });
  
  }




  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  signup() {
    if (this.form.valid) {
      let signupDetails = this.form.getRawValue();
      if (
        signupDetails.name === '' ||
        signupDetails.email === '' ||
        signupDetails.password === '' ||
        signupDetails.confirmpassword === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
         signupDetails = this.form.getRawValue();
         if(this.role==Role.Student)
         {
        this.studentauth.SignUp(signupDetails).subscribe(
          (res: any) => {
            localStorage.setItem('mail', res.student_mail);
            Swal.fire({
              icon: 'success',
              title: 'OTP Generated!',
              text: 'OTP send to your registered mail. Please check your Mail.',
            });

            this.router.navigate(['/auth/otp', { role: Role.Student }]);
    
          },
          (err: { error: { message: string | undefined } }) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
         }
         else 
         if(this.role==Role.Mentor)
         {
        this.mentorauth.SignUp(signupDetails).subscribe(
          (res: any) => {
            console.log("mentor mail" , res);
            
            localStorage.setItem('mail', res.mentor_mail);
            Swal.fire({
              icon: 'success',
              title: 'OTP Generated!',
              text: 'OTP send to your registered mail. Please check your Mail.',
            });

            this.router.navigate(['/auth/otp', { role: Role.Mentor }]);
    
          },
          (err: { error: { message: string | undefined } }) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
         }
      }
    } else {
      Swal.fire(
        'Form is not valid',
        'Please fill out all required fields',
        'error'
      );
    }
  }


}
