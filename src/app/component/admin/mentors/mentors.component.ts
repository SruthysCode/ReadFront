import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Mentorinfo } from 'src/app/Model/mentorModel';
import { AdminService } from 'src/app/Service/admin.service';
import { MentorService } from 'src/app/Service/mentor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css'],
})
export class MentorsComponent {
  mentors: Mentorinfo[] = [];
  searchMentor = '';

  constructor(
    private mentorservice: MentorService,
    private adminservice: AdminService,
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMentorsCount();
    this.getAllMentors();
  }

  getAllMentors() {
    this.mentorservice.GetMentors().subscribe((response: any) => {
      this.mentors = response;
    });
  }

  getMentorsCount() {
    this.adminservice
      .GetMentorsByCount(1, this.limit)
      .subscribe((response: any) => {
        this.mentors = response.student;
        this.total = response.total;
      });
  }

  editmentor(id: string, role: string) {
    this.router.navigate(['admin/editmentor', id, role]);
    this.getAllMentors();
  }

  deletementor(id: Object) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminservice.DeleteMentor(id).subscribe(
          (res: any) => {
            this.getAllMentors();
            this.getMentorsCount();
          },
          (err: any) => {}
        );
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
      }
    });
  }

  blockmentor(mentor: any, id: string) {
    this.adminservice.AccessMentor(String(id)).subscribe((response: any) => {
      if (response) {
        Swal.fire('Updated!', 'User access has been updated.', 'success');
        mentor.blocked = !mentor.blocked;
      }
    });
  }

  //pagination
  currentPage: number = 1;
  total: number = 0;
  limit: number = 5;
  changePage(page: number) {
    sessionStorage.setItem('selectedPage', page.toString());
    this.currentPage = page;

    this.adminservice
      .GetMentorsByCount(page, this.limit)
      .subscribe((response: any) => {
        this.mentors = response.mentor;
        this.total = response.total;
      });
  }
}
