import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MentoractivityService } from 'src/app/Service/mentoractivity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  msgview: boolean = false;
  uploadVisible: boolean = false;
  formVisible: boolean = false;
  Imgsrc?: string | ArrayBuffer | null;
  selectedFile!: File;

  private subscriptions: Subscription[] = [];
  //date
  datePipe = new DatePipe('en-IN');
  todayDateIs = new Date(); // Example date, you can use any date object
  todayDate = this.datePipe.transform(this.todayDateIs, 'dd-MM-yyyy');
  endDateIs = new Date(this.todayDateIs.getTime() + 7 * 24 * 60 * 60 * 1000);
  endDate = this.datePipe.transform(this.endDateIs, 'dd-MM-yyyy');

  bookId!: Object;
  bookTitle: string = '';

  form: FormGroup = new FormGroup({});

  constructor(
    private mentoractivityservice: MentoractivityService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.checkLatestActivity();
    this.formInitialize();
  }

  checkLatestActivity() {
    this.subscriptions.push(
      this.mentoractivityservice.checkDate().subscribe((res) => {
        if (res.success == false) {
          this.msgview = false;
        } else {
          this.msgview = true;
        }
      })
    );
  }
  formInitialize() {
    //find current  months book
    this.mentoractivityservice.getCurrentBook().subscribe((res: any) => {
      console.log('Current book is >> ', res.data[0]._id, res.data[0].title);
      this.bookId = res.data[0]._id;
      this.bookTitle = res.data[0].title;
      console.log(this.bookId, this.bookTitle);

      // form initialize
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],

        startDate: [this.todayDate],
        endDate: [this.endDate],
        startDateis: [this.todayDateIs],
        endDateis: [this.endDateIs],

        book: [this.bookId],
        bookTitle: [this.bookTitle],
      });
      this.form.get('startDate')?.disable();
      this.form.get('endDate')?.disable();
      this.form.get('bookTitle')?.disable();
    });
  }

  onFileSelected(event: Event) {
    const inputElement = (event.target as HTMLInputElement)?.files;

    if (inputElement && inputElement.length > 0) {
      this.selectedFile = inputElement[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.Imgsrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.uploadVisible = true;
      this.formVisible = true;
      // this.form.get('tempimage')?.setValue(this.selectedFile);
      // const formData = new FormData();
      // formData.append('todo', this.selectedFile, this.selectedFile.name);
      // this.mentoractivityservice
      //   .uploadToDo(formData)
      //   .subscribe((res: any) => {
      //     console.log("TODO uploadeds")
      //   })
    }
  }

  hasFormErrors(form: FormGroup): boolean {
    if (form.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.form.valid) {
      let activity = this.form.getRawValue();
      const formData = new FormData();
      formData.append('todo', this.selectedFile, this.selectedFile.name);
      if (
        activity.name === '' ||
        activity.startDate === '' ||
        activity.endDate === '' ||
        activity.book === ''
      ) {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        formData.append('activity', JSON.stringify(activity));

        this.mentoractivityservice
          .uploadToDo(formData)
          .subscribe((res: any) => {
            console.log('after upload');
            this.msgview = true;
          });
      }
    } else {
      Swal.fire('Please enter Activity Name', 'Warning!');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
