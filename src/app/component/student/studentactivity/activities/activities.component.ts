import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/Model/activityModel';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  activities: Activity[] = [];

  //
  currentPage = 1;
  itemsPerPage = 4;
  //

  constructor(private studentactivityservice: StudentactivityService) {}

  ngOnInit(): void {
    this.getActivities();
  }
  getActivities() {
    this.studentactivityservice.GetActivities().subscribe((res: any) => {
      console.log('after agett activities', res);
      this.activities = res.data;
    });
  }

  
  getActivitiesForPage(page: number): Activity[] {
    const startIndex = (page - 1) * this.itemsPerPage;
    return this.activities.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.activities.length / this.itemsPerPage);
  }

  getPaginationArray(): number[] {
    return Array(this.getTotalPages())
      .fill(0)
      .map((x, i) => i + 1);
  }
  
}
