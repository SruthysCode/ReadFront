import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentorService } from 'src/app/Service/mentor.service';
import { MentoractivityService } from 'src/app/Service/mentoractivity.service';
import { ModalService } from 'src/app/Service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],

  // animations: [
  //   trigger('modalState', [
  //     state(
  //       'hidden',
  //       style({
  //         opacity: 0,
  //         transform: 'translateY(-100%)',
  //       })
  //     ),
  //     state(
  //       'visible',
  //       style({
  //         opacity: 1,
  //         transform: 'translateY(0)',
  //       })
  //     ),
  //     transition('hidden => visible', animate('300ms ease-in')),
  //     transition('visible => hidden', animate('300ms ease-out')),
  //   ]),
  // ],
})
export class BookComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  Imgsrc?: string | ArrayBuffer | null;
  selectedFile!: File;

  pdfSrc: string = '';
  visible: boolean = false;
  fullWidth: boolean = false;

  formVisible: boolean = false;
  form: FormGroup = new FormGroup({});

  msgview: boolean = false;

  //date
  datePipe = new DatePipe('en-IN');
  todayDateIs = new Date(); // Example date, you can use any date object
  todayDate = this.datePipe.transform(this.todayDateIs, 'dd-MM-yyyy');
  endDateIs = new Date(this.todayDateIs.getTime() + 30 * 24 * 60 * 60 * 1000);
  endDate = this.datePipe.transform(this.endDateIs, 'dd-MM-yyyy');

  constructor(
    private mentoractivityservice: MentoractivityService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkLatestActivity();

    console.log(this.todayDate, this.endDate);

    this.form = this.formbuilder.group({
      name: ['', [Validators.maxLength(15)]],
      author: ['', Validators.maxLength(15)],
      startDate: [this.todayDate],
      endDate: [this.endDate],
      startDateis: [this.todayDateIs],
      endDateis: [this.endDateIs],
    });
    this.form.get('startDate')?.disable();
    this.form.get('endDate')?.disable();
  }

  checkLatestActivity() {
    this.subscriptions.push(
      this.mentoractivityservice.checkDateBook().subscribe((res: ApiResponse) => {
        console.log('ResPonse ', res);
        if (res.success == false) {
          this.msgview = false;
        } else {
          this.msgview = true;
        }
      })
    );
  }

  // closeModal() {
  //   this.modalservice.hide();
  // }

  // get modalState() {
  //   return this.modalservice.isVisible ? 'visible' : 'hidden';
  // }

  onFileSelected(event: Event) {
    const inputElement = (event.target as HTMLInputElement)?.files;
    if (inputElement && inputElement.length > 0) {
      this.selectedFile = inputElement[0];
      if (this.selectedFile.type === 'application/pdf') {
        const reader = new FileReader();
        reader.onload = () => {
          this.pdfSrc = reader.result as string;
        };
        this.formVisible = true; // Show the PDF viewer

        reader.readAsDataURL(this.selectedFile);

        //   const formData = new FormData();
        //   formData.append('book', this.selectedFile, this.selectedFile.name);
        //   this.mentoractivityservice
        //     .uploadBook(formData)
        //     .subscribe((res: any) => {
        //       console.log('File uploadeds');
        //     });
      } else {
        console.error('Selected file is not a PDF');
      }
    }
  }

  // toggleFullScreen() {
  //   const pdfViewer = document.querySelector('pdf-viewer') as any;
  //   console.log('pdfcccc', pdfViewer);
  //   if (pdfViewer) {
  //     // pdfViewer.fullscreen = pdfViewer.fullscreen;
  //     pdfViewer.fullscreen = true;
  //   }
  // }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      let book = this.form.getRawValue();
      const formData = new FormData();
      formData.append('book', this.selectedFile, this.selectedFile.name);
      formData.append('bookDetails', JSON.stringify(book));

      if (
        book.name === '' ||
        book.startDate === '' ||
        book.endDate === '' ||
        book.book === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        console.log('datas ', formData);
        this.mentoractivityservice
          .uploadBook(formData)
          .subscribe((res: any) => {
            Swal.fire('Book uploaded', 'success');
            this.msgview = true;
            // setTimeout(() => this.msgview= false, 3000);
            // this.modalservice.show();
            // setTimeout(() => this.modalservice.hide(), 3000); // Hide after 3 seconds
          });
      }
    } else {
      Swal.fire('Please enter book Name', 'Warning!');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
