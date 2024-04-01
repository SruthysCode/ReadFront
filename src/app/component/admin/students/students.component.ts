import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Studentprofile } from 'src/app/Model/studentModel';
import { AdminService } from 'src/app/Service/admin.service';
import { StudentService } from 'src/app/Service/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  searchStudent = '';

  Students: Studentprofile[] = [];
  constructor(
    private studentservice: StudentService,
    private router: Router,
    private http: HttpClient,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getStudentCount();
  }

  getStudents() {
    this.studentservice.GetStudents().subscribe((response: any) => {
      this.Students = response;
    });
  }

  getStudentCount() {
    this.studentservice
      .GetStudentsByCount(1, this.limit)
      .subscribe((response: any) => {
        this.Students = response.student;
        this.total = response.total;
      });
  }

  editStudents(id: string, role: string) {
    this.router.navigate(['admin/editstudent', id, role]);
    this.getStudents();
  }

  deleteStudents(id: Object) {
    Swal.fire({
      title: 'Are you sure to Delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminservice.DeleteStudent(id).subscribe(
          (res: any) => {
            this.getStudents();

            // this.getStudentCount();
          },
          (err) => {}
        );
        // this.getStudents();

        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      }
    });
  }

  blockStudents(student: any, id: string) {
    this.studentservice.Access(id).subscribe(
      (res: any) => {
        if (res.student) {
          Swal.fire('Updated!', 'User access has been updated.', 'success');
          student.blocked = !student.blocked;
        }
      },
      (err: any) => {}
    );
  }

  //pagination
  currentPage: number = 1;
  total: number = 0;
  limit: number = 5;
  changePage(page: number) {
    sessionStorage.setItem('selectedPage', page.toString());
    this.currentPage = page;

    this.studentservice
      .GetStudentsByCount(page, this.limit)
      .subscribe((response: any) => {
        this.Students = response.student;
        this.total = response.total;
      });
  }
}
