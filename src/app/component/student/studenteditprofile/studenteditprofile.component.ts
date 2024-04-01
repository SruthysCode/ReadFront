import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/Service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studenteditprofile',
  templateUrl: './studenteditprofile.component.html',
  styleUrls: ['./studenteditprofile.component.css'],
})
export class StudenteditprofileComponent implements OnInit{
  form: FormGroup = new FormGroup({});

  @Input() showModal: boolean = false;
  @Input() student: any; // Pass the student data to be edited
  @Output() closeModal = new EventEmitter();
  @Output() saveChanges = new EventEmitter();

  editedStudent: any;
  img?: string;
  selectedFile: File | undefined;
  Imgsrc?: string | ArrayBuffer | null;

  constructor(
    private studentservice: StudentService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.editedStudent = { ...this.student };
    this.form = this.formBuilder.group({
      name: [this.editedStudent.name, [Validators.required]],
      email: [
        this.editedStudent.email,
        [Validators.required, Validators.email],
      ],
      address: [this.editedStudent.address, [Validators.required]],
      mobile: [this.editedStudent.mobile, [Validators.required]],
      avatar: [this.editedStudent.avatar, [Validators.required]],
    });
    this.form.get('email')?.disable();
  }

  ngOnChanges() {
    this.editedStudent = { ...this.student };
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      let student = this.form.getRawValue();
      if (
        student.name === '' ||
        student.email === '' ||
        student.address === '' ||
        student.mobile === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        const student = this.form.getRawValue();
        this.studentservice.Edit(student).subscribe(
          (res: any) => {
            this.editedStudent = res;
            this.studentservice.emitName(
              this.editedStudent.name,
              this.editedStudent.avatar
            );
          },
          (err: { error: { message: string | undefined } }) => {
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
    this.saveChanges.emit(this.editedStudent);
    // Close the modal
    this.closeModal.emit();
  }

  onFileSelected(event: Event): void {
    const inputElement = (event.target as HTMLInputElement)?.files;
    if (inputElement && inputElement.length > -1) {
      this.selectedFile = inputElement[0];
      const reader = new FileReader();
      if (reader.result == null) {
        this.Imgsrc = '';
      }
      reader.onload = () => {
        this.Imgsrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      // to display the image
      this.form.get('tempimage')?.setValue(this.selectedFile);
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.studentservice.uploadimage(formData).subscribe((res: any) => {});
    }
  }
}
