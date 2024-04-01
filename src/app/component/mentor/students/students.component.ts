import { Component, OnInit } from '@angular/core';
import { Studentprofile } from 'src/app/Model/studentModel';
import { StudentService } from 'src/app/Service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  Students: Studentprofile[] = [];

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.studentservice.GetStudents().subscribe((response: any) => {
      this.Students = response;
    });
  }
}
