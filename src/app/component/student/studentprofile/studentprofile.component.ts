import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Studentprofile } from 'src/app/Model/studentModel';
import { StudentService } from 'src/app/Service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css'],
})
export class StudentprofileComponent implements OnInit{
  student!: Studentprofile;
  @Input() studentName: string = '';
  @Input() studentImage: string = '';
  @Output() studentUpdated = new EventEmitter<{
    name: string;
    imageUrl: string;
  }>();
  @ViewChild('myDialog') myDialog!: ElementRef<HTMLDialogElement>;

  form: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private studentservice: StudentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.minLength(8)],
    });

    this.getStudentProfile();
    this.studentservice.emitName(this.student.name, this.student.avatar);
  }

  getStudentProfile() {
    this.studentservice.LoadProfile().subscribe((res: any) => {
      const studentemail = res.data.email;
      this.student = res.data;
      this.updateStudentDetails(this.student.name, this.student.avatar);
    });
  }

  isModalOpen: boolean = false;

  openEditModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges(updatedStudent: any) {
    this.student = updatedStudent;
    this.updateStudentDetails(this.student.name, this.student.avatar);
    this.studentservice.emitName(this.student.name, this.student.avatar);

    // Close the modal
    this.closeModal();
  }

  updateStudentDetails(name: string, imageUrl: string) {
    this.studentUpdated.emit({ name, imageUrl });
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  updatePassword() {
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      if (password == '') {
        Swal.fire('Please enter Password', 'Warning!');
      } else {
        this.studentservice.ChangePassword(password).subscribe((res: any) => {
          if (res.success == true) {
            Swal.fire('Password changed Successfully', 'Success!');
            this.myDialog.nativeElement.close();
          }
        });
      }
    } else {
      Swal.fire('Please Enter Password', 'Warning!');
    }
  }
}
