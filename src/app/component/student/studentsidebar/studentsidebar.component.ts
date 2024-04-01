import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiResponse } from 'src/app/Model/responseModel';
import { Studentprofile } from 'src/app/Model/studentModel';
import { NotificationService } from 'src/app/Service/notification.service';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-studentsidebar',
  templateUrl: './studentsidebar.component.html',
  styleUrls: ['./studentsidebar.component.css'],
})
export class StudentsidebarComponent implements OnInit, OnDestroy {
  @Input() studentName: string = '';
  @Input() studentImage: string = '';
  student!: Studentprofile;
  STname: string = '';
  trial: string = '';

  isMentorsSelected: boolean = false;
  isActivitiesSelected: boolean = false;
  isBlogSelected: boolean = false;
  isConnectSelected: boolean = false;
  isChatSelected: boolean = false;
  isnotify: boolean = false;
  showNotifications: boolean = false;

  Notifys: { type: string; read: boolean; _id: string }[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private studentservice: StudentService,
    private notificationservice: NotificationService
  ) {}

  ngOnInit(): void {
    this.getStudent();
    this.studentservice.subscriber$.subscribe((data: any) => {
      this.studentName = data.name;
      this.studentImage = data.image;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateSelectedState();
      }
    });
  }

  getStudent() {
    this.studentservice.LoadProfile().subscribe((res: any) => {
      const studentemail = res.data.email;
      this.student = res.data;
      this.studentName = this.student.name;
      this.studentImage = this.student.avatar;
      
      this.notificationservice.joinNotifications(this.student._id);
      this.notificationservice
        .getNotification()
        .subscribe((notification: string) => {
          
          this.isnotify = true;
        });

      this.getAllNotifications();
    });
    // this.studentservice.changeStudentName(this.studentName);
  }

  updateSelectedState() {
    const currentRoute = this.router.url;
    this.isMentorsSelected = currentRoute.includes('/mentors');
    this.isActivitiesSelected = currentRoute.includes('/activities');
    this.isBlogSelected = currentRoute.includes('/blog');
    this.isConnectSelected = currentRoute.includes('/connect');
    this.isChatSelected = currentRoute.includes('/chat');
  }

  getAllNotifications() {
    this.studentservice.GetNotifications().subscribe((res: any) => {
      this.Notifys = res.data[0].notification;
      
      if (this.Notifys.length > 0) {
        this.isnotify = true;
      }
    });
  }
  getnotifications() {
  
    this.getAllNotifications();
    this.showNotifications = true;
    this.isnotify = false;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  clearNotifications() {
    this.studentservice.UpdateNotifications().subscribe((res:any)=>{})
    this.Notifys = [];
    this.isnotify = false;
  }

  logout() {
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('mail');
    localStorage.removeItem('student_token');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.notificationservice.leaveNotifications(this.student._id);
  }
}
