import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Model/adminModel';
import { AdminService } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  admin!: Admin;
  constructor(
    private http: HttpClient,
    private router: Router,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    this.adminservice.GetAdminDetails().subscribe((res: any) => {
      this.admin = res.data;
    });
  }

  logout() {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin_token');
    this.router.navigate(['admin/login']);
  }
}
