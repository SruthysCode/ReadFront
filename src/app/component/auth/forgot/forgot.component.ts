import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorAuthService } from 'src/app/Service/mentor-auth.service';
import { StudentAuthService } from 'src/app/Service/student-auth.service';
import { Role } from 'src/app/enum/role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent implements OnInit {
  role: string = '';
  form: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private studentauth: StudentAuthService,
    private mentorauth: MentorAuthService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.role = params['role'];
    });

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  verifymail() {
    const data = this.form.getRawValue();
    console.log(Role.Mentor, '/role', Role.Student);
    try {
      if (this.role == Role.Student) {
        this.studentauth
          .ForgotPassword(data.email)
          .subscribe((response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Password Updated',
              text: 'Password updated successfully. Please check your Mail.',
            });
            this.router.navigate(['/auth/login', { role: Role.Student }]);
          });
      } else if (this.role == Role.Mentor) {
        this.mentorauth
          .ForgotPassword(data.email)
          // .subscribe((response: any) => {
          //   Swal.fire({
          //     icon: 'success',
          //     title: 'Password Updated',
          //     text: 'Password updated successfully. Please check your Mail.',
          //   });

            this.router.navigate(['/auth/login', { role: Role.Mentor }]);
          // });
      }
    } catch (err: any) {
      Swal.fire('Error', 'Some Error ', 'error');
    }
  }
}
