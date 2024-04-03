import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivityName, Rank } from 'src/app/Model/activityModel';
import { StudentactivityService } from 'src/app/Service/studentactivity.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css'],
})
export class MarkComponent implements OnInit, OnDestroy {
  Activity: ActivityName[] = [];
  Activityname : string='';
  noActivity: boolean = false;
  rank!: Rank;
  rankDetails: boolean = false;
  constructor(private studentactivity: StudentactivityService) {}

  ngOnInit(): void {
    this.getActivity();
  }

  getActivity() {
    this.studentactivity.getAllActivity().subscribe((res: any) => {
      this.Activity = res.data;
      console.log('activity', this.Activity);
      if (this.Activity.length == 0) {
        this.noActivity = true;
      } else {
        this.noActivity = false;
      }
    });
  }

  DisplayMark(todoID: string, todoname : string) {
    this.studentactivity.GetRank(todoID).subscribe((res: any) => {
      console.log(res);
      this.rank = res.data[0];
      this.rankDetails = true;
      this.Activityname = todoname;
    });
  }

  ngOnDestroy(): void {}
}
