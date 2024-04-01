import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Activity, Blog } from 'src/app/Model/activityModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentoractivityService } from 'src/app/Service/mentoractivity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css'],
})
export class MarksComponent implements OnInit, OnDestroy {
  Blog: Blog[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  
  form: FormGroup = new FormGroup({});

  selectedMark: number=0;

  constructor(private mentoractivityservice: MentoractivityService,
              private formbuilder : FormBuilder,
              ) {}

  ngOnInit(): void {
    this.LoadActivities();
   }

  LoadActivities() {
    this.mentoractivityservice.GetActivities().subscribe((res: ApiResponse) => {
      
      this.Blog = res.data;
    }
    )
      // (error: any) => {
      //   console.error(error);
      // };
  }

  onMarkChange(event: any) {  
     this.selectedMark = event.target.value;
    console.log( 'mark :', this.selectedMark);
   
}

  onSubmit(blog : Blog){

    
    const activityID = blog._id;
    console.log(this.selectedMark, "mark & id ", activityID);
   
    this.mentoractivityservice.UpdateMark(activityID, this.selectedMark).subscribe((res :ApiResponse)=>{
      console.log("up ", res.data)
    })

  
  }
 

  getPaginatedBlog(): Blog[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.Blog.length);
    return this.Blog.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.Blog.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  ngOnDestroy(): void {}
}
