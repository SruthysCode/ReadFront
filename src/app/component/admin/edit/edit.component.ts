import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mentorinfo } from 'src/app/Model/mentorModel';
import { AdminService } from 'src/app/Service/admin.service';
import { MentorService } from 'src/app/Service/mentor.service';
import { Role } from 'src/app/enum/role.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id!: string;
  role!: string;
  data!: Mentorinfo | any;
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private mentorservice: MentorService,
    private adminservice: AdminService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.role = params['role'];
    });
    if (this.role == Role.Student) {
      this.adminservice
        .GetStudentDetails(this.id)
        .subscribe((response: any) => {
          this.data = response;
          this.data = this.data.data;
          this.data.role = this.role;

          // this.initForm();
          this.form = this.formBuilder.group({
            id: [this.data._id, [Validators.required]],
            name: [this.data.name, [Validators.required]],
            email: [this.data.email, [Validators.required, Validators.email]],
            address: [this.data.address, [Validators.required]],
            mobile: [this.data.mobile, [Validators.required]],
            avatar: [this.data.avatar, [Validators.required]],
            role: [this.data.role, [Validators.required]],
          });
        });
    } else {
      // mentor details
      this.adminservice.GetMentorDetails(this.id).subscribe((response: any) => {
        this.data = response;
        this.data = this.data.data;
        this.data.role = this.role;

        this.form = this.formBuilder.group({
          id: [this.data._id, [Validators.required]],
          name: [this.data.name, [Validators.required]],
          email: [this.data.email, [Validators.required, Validators.email]],
          address: [this.data.address, [Validators.required]],
          mobile: [this.data.mobile, [Validators.required]],
          avatar: [this.data.avatar, [Validators.required]],
          role: [this.data.role, [Validators.required]],
        });
        this.form.get('email')?.disable();
      });
    }
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    const details = this.form.getRawValue();
    if (this.form.valid) {
      if (
        details.name === '' ||
        details.email === '' ||
        details.address === '' ||
        details.mobile === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        if (details.role == Role.Mentor) {
          this.adminservice.EditMentor(details).subscribe(
            (res: any) => {
              Swal.fire(
                'Success',
                'Updated the Details Successfully',
                'success'
              );
              this.router.navigate(['admin/mentors']);
              this.data = res.data;
            },
            (err: { error: { message: string | undefined } }) => {
              Swal.fire('Error', err.error.message, 'error');
            }
          );
        } else if (details.role == Role.Student) {
          this.adminservice.EditStudent(details).subscribe(
            (res: any) => {
              Swal.fire(
                'Success',
                'Updated the Details Successfully',
                'success'
              );
              this.router.navigate(['admin/students']);
              this.data = res.data;
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
    // END of modal
  }
  onFileSelected(event: Event): void {}
}
