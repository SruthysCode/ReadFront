import { Component, OnInit } from '@angular/core';
import { Mentors } from 'src/app/Model/mentorModel';
import { MentorService } from 'src/app/Service/mentor.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css'],
})
export class MentorsComponent implements OnInit {
  mentors: Mentors[] = [];

  constructor(private mentorservice: MentorService) {}

  ngOnInit(): void {
    this.mentorservice.GetMentors().subscribe((response: any) => {
      this.mentors = response;
    });
  }
}
