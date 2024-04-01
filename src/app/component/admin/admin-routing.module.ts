import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { StudentsComponent } from './students/students.component';
import { MentorsComponent } from './mentors/mentors.component';
import { ActivitiesComponent } from './activities/activities.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'adminlogin',
    pathMatch: 'full',
  },
  {
    path: 'adminlogin',
    component: LoginComponent,
    data: { title: 'AdminLogin' },
  },
  {
    path: 'home',
    // redirectTo: 'dashboard',
    // pathMatch: 'full',

    component: AdminhomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard' },
      },
      {
        path: 'students',
        component: StudentsComponent,
        data: { title: 'Students' },
      },
      {
        path: 'mentors',
        component: MentorsComponent,
        data: { title: 'Mentors' },
      },
      {
        path: 'activities',
        component: ActivitiesComponent,
        data: { title: 'Activities' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
