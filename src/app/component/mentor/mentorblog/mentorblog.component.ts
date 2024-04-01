import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Model/activityModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentorService } from 'src/app/Service/mentor.service';
import { MentoractivityService } from 'src/app/Service/mentoractivity.service';
import { NotificationService } from 'src/app/Service/notification.service';

@Component({
  selector: 'app-mentorblog',
  templateUrl: './mentorblog.component.html',
  styleUrls: ['./mentorblog.component.css'],
})
export class MentorblogComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 4;

  Blog: Blog[] = [];

  newcomment: string = '';

  mentorName: string = '';

  constructor(
    private mentoractivityservice: MentoractivityService,
    private mentorservice: MentorService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.GetBlog();
    this.mentorservice.LoadProfile().subscribe((res: any) => {
      this.mentorName = res.data.name;
    });
  }

  GetBlog() {
    this.mentoractivityservice.GetBlog().subscribe((res: ApiResponse) => {
      this.Blog = res.data;
    });
  }

  // like & comment

  likeBlog(blog: any) {
    blog.likes = (blog.likes || 0) + 1;
    this.mentoractivityservice
      .UpdateLikes(blog._id, blog.likes, this.mentorName)
      .subscribe((res: any) => {
        const studentID = res.studentID;
        const data = {
          receiverID: studentID,
          type: 'Like',
        };

        this.notificationService.sendNotification(data);
      });
  }

  sendMessage(blog: any) {
    this.mentoractivityservice
      .UpdateComment(blog._id, this.newcomment, this.mentorName)
      .subscribe((res: any) => {
        this.newcomment = '';
        blog.comments = res.data.comments;
        const studentID = res.studentID;
        const data = {
          receiverID: studentID,
          type: 'Comment',
        };

        this.notificationService.sendNotification(data);
      });
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
}
