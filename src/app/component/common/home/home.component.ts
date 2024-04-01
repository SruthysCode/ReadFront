import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../../enum/role.enum';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router,
    private studentservice : StudentService ) {}

  ngOnInit(): void {
  }

  studentlogin() {
    console.log("in student log");
    this.router.navigate(['/auth/login', { role: Role.Student }]);
  }

  mentorlogin() {
    console.log("in mentor login")
    this.router.navigate(['/auth/login', { role: Role.Mentor }]);
  }
}
