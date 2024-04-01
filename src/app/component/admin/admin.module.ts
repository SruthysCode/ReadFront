import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { StudentsComponent } from './students/students.component';
import { MentorsComponent } from './mentors/mentors.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesComponent } from './activities/activities.component';

@NgModule({
  declarations: [
    AdminhomeComponent,
    StudentsComponent,
    MentorsComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    EditComponent,
    ActivitiesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
})
export class AdminModule {}
