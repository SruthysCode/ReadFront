import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Model/activityModel';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';
import { ImageModule } from 'primeng/image';
import { AdminactivityService } from 'src/app/Service/adminactivity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  values = ['Value 1', 'Value 2', 'v3', 'v4'];

  Blog: Blog[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private studentactivityService: StudentactivityService,
    private adminactivityservice: AdminactivityService
  ) {}

  ngOnInit() {
    this.GetBlogs();
  }

  GetBlogs() {
    this.adminactivityservice.GetBlog().subscribe((res: any) => {
      this.Blog = res.data;
      console.log(this.Blog);
    });
  }

  block(blog: Blog, activityID: string) {
    console.log('actid block', activityID);
    this.adminactivityservice.block(activityID).subscribe((res: any) => {});
    blog.blocked = !blog.blocked;
  }

  unblock(blog: Blog, activityID: string) {
    console.log('actid unblock ', activityID);
    this.adminactivityservice.unblock(activityID).subscribe((res) => {});
    blog.blocked = !blog.blocked;
  }

  //pagination

  currentPage = 1;
  itemsPerPage = 2;

  get totalPages(): number {
    return Math.ceil(this.Blog.length / this.itemsPerPage);
  }

  get paginatedBlog(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.Blog.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
