import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mentorinfo } from 'src/app/Model/mentorModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentorService } from 'src/app/Service/mentor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentorprofile',
  templateUrl: './mentorprofile.component.html',
  styleUrls: ['./mentorprofile.component.css'],
})
export class MentorprofileComponent implements OnInit {
  @Input() mentor!: Mentorinfo;
  @Input() mentorName: string = '';
  @Input() mentorImage: string = '';

  @ViewChild('myDialog') myDialog!: ElementRef<HTMLDialogElement>;

  form: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private mentorservice: MentorService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', Validators.minLength(8)],
    });

    this.mentorservice.LoadProfile().subscribe((res: any) => {
      const mentoremail = res.data.email;
      this.mentor = res.data;
    });
  }

  isModalOpen: boolean = false;

  openEditModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges(updatedmentor: any) {
    this.mentor = updatedmentor;
    this.mentorservice.emitMentor(this.mentor.name, this.mentor.avatar);
    // Close the modal
    this.closeModal();
  }

  updatePassword() {
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      if (password == '') {
        Swal.fire('Please enter Password', 'Warning!');
      } else {
        // Swal.fire(' entered all the fields', 'Success!');
        this.mentorservice.ChangePassword(password).subscribe((res: any) => {
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
