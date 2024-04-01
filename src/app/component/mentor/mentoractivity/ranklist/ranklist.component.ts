import { Component, OnDestroy, OnInit } from '@angular/core';
import { Rank, TodoActivity } from 'src/app/Model/activityModel';
import { ApiResponse } from 'src/app/Model/responseModel';
import { MentoractivityService } from 'src/app/Service/mentoractivity.service';

@Component({
  selector: 'app-ranklist',
  templateUrl: './ranklist.component.html',
  styleUrls: ['./ranklist.component.css'],
})
export class RanklistComponent implements OnInit, OnDestroy {
  Rankvisibility: boolean = true;
  RankList: boolean = false;

  Rank: Rank[] = [];
  Activity : TodoActivity[]=[];
  constructor(private mentoractivityservice: MentoractivityService) {}

  ngOnInit(): void {
    this.TimeforRankList();
    this.DisplayActivities();
  }

  DisplayActivities(){
    this.mentoractivityservice.DisplayActivity().subscribe((res: ApiResponse)=>{
this.Activity= res.data;
    })
  }



  TimeforRankList() {
    this.mentoractivityservice.checkTimeForRankList().subscribe((res: ApiResponse) => {
      console.log('bck ', res);
      if (res.success == false) {
        this.Rankvisibility = false;
      } else {
        this.Rankvisibility = true;
      }
    });
  }

  Generate() {
    console.log('click');
    this.RankList = true;
    this.mentoractivityservice.RankList().subscribe((res: ApiResponse) => {
      console.log('rank ', res);
      this.Rank = res.data;
    });
  }

  GenerateRank(todoID : object){
    this.RankList = true;
    this.mentoractivityservice.GenerateRank(todoID).subscribe((res: ApiResponse) => {
      console.log('rank ', res);
      this.Rank = res.data;
    });
  
  }

  FinalRank()
  {
    this.RankList = true;
    this.mentoractivityservice.FinalRank().subscribe((res: ApiResponse) => {
      console.log('rank ', res);
      this.Rank = res.data;
    });
  }

  ngOnDestroy(): void {}
}
