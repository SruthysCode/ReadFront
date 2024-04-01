import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/Model/responseModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  students: number = 0;
  mentors: number = 0;
  books: number = 0;
  activitys: number = 0;

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.adminservice.GetCounts().subscribe((res: any) => {
      console.log('coun', res);
      this.students = res.data.students;
      this.mentors = res.data.mentors;
      this.books = res.data.books;
      this.activitys = res.data.activitys;
    });
  }
}
