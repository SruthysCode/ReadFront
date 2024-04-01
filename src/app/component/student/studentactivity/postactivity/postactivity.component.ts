import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postactivity',
  templateUrl: './postactivity.component.html',
  styleUrls: ['./postactivity.component.css'],
})
export class PostactivityComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  Imgsrc?: string | ArrayBuffer | null;
  Activitysrc?: string | ArrayBuffer | null;
  activityID!: Object;
  todayDateIs = new Date();
  visiblePost: boolean = false;
  showActivity: boolean = true;
  hideActivity: boolean = false;
  selectedFile!: File;

  form: FormGroup = new FormGroup({});

  constructor(
    private studentactivityservice: StudentactivityService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCurrentActivity();
    // this.loadForm();
  }

  getCurrentActivity() {
    this.subscription.add(
      this.studentactivityservice.getActivity().subscribe((res: any) => {
        this.showActivity = res.success;
        if (res.data.length == 0) {
          this.showActivity = false;
        }
        this.Imgsrc = res.data[0].link;
        this.activityID = res.data[0]._id;

        this.form = this.formbuilder.group({
          activity: [this.activityID, [Validators.required]],
          Date: [this.todayDateIs],
        });
        this.form.get('Date')?.disable;
        this.form.get('activity')?.disable();
        this.CheckActivityPosted(this.activityID);
      })
    );

    // this.studentactivityservice
    //   .CheckPosted(this.activityID)
    //   .subscribe((res: any) => {
    //     console.log('Afet check posted ', res);
    //     this.hideActivity = res.success;
    //     // if(res.success)
    //     // {
    //     //   this.hideActivity=true
    //     // }
    //   });
  }

  loadForm() {
    this.form = this.formbuilder.group({
      activity: [this.activityID, [Validators.required]],
      Date: [this.todayDateIs],
    });
    this.form.get('Date')?.disable();
    this.form.get('activity')?.disable();
  }

  CheckActivityPosted(activityID: Object) {
    this.studentactivityservice
      .CheckPosted(activityID)
      .subscribe((res: any) => {
        console.log('Afet check posted ', res);
        this.hideActivity = res.success;
        // if(res.success)
        // {
        //   this.hideActivity=true
        // }
      });
  }

  onFileSelected(event: Event) {
    const inputElement = (event.target as HTMLInputElement)?.files;
    if (inputElement && inputElement.length > 0) {
      this.selectedFile = inputElement[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.Activitysrc = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.visiblePost = true;
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
      let postactivity = this.form.getRawValue();
      const formData = new FormData();
      formData.append('activity', this.selectedFile, this.selectedFile.name);
      if (postactivity.activity === '' || postactivity.Date === '') {
        Swal.fire('Please enter all the fields', 'Warning!');
      } else if (this.hasFormErrors(this.form)) {
        Swal.fire('Check Inputs', 'Enter all input fields properly', 'warning');
      } else {
        formData.append('postDetails', JSON.stringify(postactivity));

        this.subscription.add(
          this.studentactivityservice
            .uploadActivity(formData)
            .subscribe((res: any) => {
              this.hideActivity = true;
            })
        );
      }
    } else {
      Swal.fire('Please enter Activity Name', 'Warning!');
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
