import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentorService } from 'src/app/Service/mentor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentoreditprofile',
  templateUrl: './mentoreditprofile.component.html',
  styleUrls: ['./mentoreditprofile.component.css'],
})
export class MentoreditprofileComponent {
  form: FormGroup = new FormGroup({});

  @Input() showModal: boolean = false;
  @Input() mentor: any; // Pass the mentor data to be edited
  @Output() closeModal = new EventEmitter();
  @Output() saveChanges = new EventEmitter();

  editedmentor: any;
  img?: string;
  selectedFile: File | undefined;
  Imgsrc?: string | ArrayBuffer | null;

  constructor(
    private mentorservice: MentorService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.editedmentor = { ...this.mentor };
    this.form = this.formBuilder.group({
      name: [this.editedmentor.name, [Validators.required]],
      email: [this.editedmentor.email, [Validators.required, Validators.email]],
      address: [this.editedmentor.address, [Validators.required]],
      mobile: [this.editedmentor.mobile, [Validators.required]],
      avatar: [this.editedmentor.avatar, [Validators.required]],
      tempimage: [''],
    });
    this.form.get('email')?.disable();
  }

  ngOnChanges() {
    this.editedmentor = { ...this.mentor };
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      let mentor = this.form.getRawValue();

      if (mentor.tempimage) {
        mentor.avatar = mentor.tempimage;
      }
      if (
        mentor.name === '' ||
        mentor.email === '' ||
        mentor.address === '' ||
        mentor.mobile === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        const mentorData = this.form.getRawValue();

        this.mentorservice.updateMentorDetails(mentor).subscribe(
          (res: any) => {
            this.editedmentor = res.mentor;
            mentor = this.editedmentor;

            this.mentorservice.emitMentor(
              this.editedmentor.name,
              this.editedmentor.avatar
            );
            console.log('in edeit');
          },
          (err: { error: { message: string | undefined } }) => {
            console.log('Errr', err);
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

    this.saveChanges.emit(this.editedmentor);
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
      formData.append('image', this.selectedFile);
      this.mentorservice.UploadImage(formData).subscribe((res: any) => {
        this.form.get('avatar')?.setValue(res.data.avatar);
        this.form.get('tempimage')?.setValue('');
      });
    }
  }
}
