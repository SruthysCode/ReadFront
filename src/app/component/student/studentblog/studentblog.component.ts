import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Model/activityModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { StudentService } from 'src/app/Service/student.service';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';

@Component({
  selector: 'app-studentblog',
  templateUrl: './studentblog.component.html',
  styleUrls: ['./studentblog.component.css'],
})
export class StudentblogComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 4;
  newcomment: string = '';
  Blog: Blog[] = [];
  studentName: string = '';
  constructor(
    private studentactivityservice: StudentactivityService,
    private studentservice: StudentService
  ) {}

  ngOnInit(): void {
    this.GetBlog();
    this.studentservice.currentStudentName.subscribe(Name =>{
      this.studentName=Name;
     })
     this.studentservice.LoadProfile().subscribe((res : any)=>{
      this.studentName= res.data.name;
     })
   }

  GetStudentName() {
    this.studentservice.subscriber$.subscribe((data: any) => {
      console.log('name ', data);
      this.studentName = data.name;
  
    });
  }

  GetBlog() {
    this.studentactivityservice.GetBlog().subscribe((res: ApiResponse) => {
      console.log('blog ', res.data);
      this.Blog = res.data;
    });
  }

  likeBlog(blog: any) {
    blog.likes = (blog.likes || 0) + 1;
    this.studentactivityservice
      .UpdateLikes(blog._id, blog.likes, this.studentName)
      .subscribe((res: ApiResponse) => {});
  }

  sendMessage(blog: any) {
        this.studentactivityservice.UpdateComment(blog._id, this.newcomment,this.studentName).subscribe((res :ApiResponse)=>{

      this.newcomment='';
      blog.comments= res.data.comments

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

  toggleImageSize() {
    console.log('OVER');
    var largerImage = document.getElementById('largerImage');
    if (largerImage) {
      largerImage.classList.toggle('hidden');

      var activityImage = document.getElementById(
        'activityImage'
      ) as HTMLImageElement;
      var largerImageView = document.getElementById(
        'largerImageView'
      ) as HTMLImageElement;
      largerImageView.src = activityImage.src;
    }
  }
}
