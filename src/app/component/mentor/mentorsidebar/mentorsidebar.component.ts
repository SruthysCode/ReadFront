import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Mentorinfo } from 'src/app/Model/mentorModel';
import { MentorService } from 'src/app/Service/mentor.service';

@Component({
  selector: 'app-mentorsidebar',
  templateUrl: './mentorsidebar.component.html',
  styleUrls: ['./mentorsidebar.component.css'],
})
export class MentorsidebarComponent {
  mentor!: Mentorinfo;
  @Input() mentorName: string = '';
  @Input() mentorImage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private mentorservice: MentorService
  ) {}

  ngOnInit(): void {
    this.mentorservice.LoadProfile().subscribe((res: any) => {
      const mentoremail = res.data.email;
      this.mentor = res.data;
      this.mentorName = this.mentor.name;
      this.mentorImage = this.mentor.avatar;
    });

    this.mentorservice.subscriber$.subscribe((data: any) => {
      this.mentorName = data.name;
      this.mentorImage = data.image;
    });
  }

  logout() {
    localStorage.removeItem('ismentorLoggedIn');
    localStorage.removeItem('mail');
    localStorage.removeItem('mentor_token');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
