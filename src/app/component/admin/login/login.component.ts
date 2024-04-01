import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');

    if (isLoggedIn) {
      this.router.navigate(['admin/home']);
    }
  }

  validateEmail = (email: any) => {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      const admin = this.form.getRawValue();
      if (admin.email === '' || admin.password === '') {
        Swal.fire('All fields are required', 'Warning!');
      } else if (!this.validateEmail(admin.email)) {
        Swal.fire('Please enter a valid email', 'Warning!');
      } else {
        this.adminservice.Login(admin).subscribe(
          (res: any) => {
            console.log('Admin res >>', res);
            localStorage.setItem('isAdminLoggedIn', 'true');
            localStorage.setItem('admin_token', res.token);
            this.router.navigate(['admin/home']);
          },
          (err: any) => {
            console.log(err);
            Swal.fire('Error', err.error.message, 'error');
          }
        );
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
