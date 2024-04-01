import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { MentorsComponent } from './mentors/mentors.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StudentsidebarComponent } from './studentsidebar/studentsidebar.component';
import { StudentactivityComponent } from './studentactivity/studentactivity.component';
import { StudentblogComponent } from './studentblog/studentblog.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StudenteditprofileComponent } from './studenteditprofile/studenteditprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentconnectComponent } from './studentconnect/studentconnect.component';
import { StudentchatComponent } from './studentchat/studentchat.component';
import { BookComponent } from './studentactivity/book/book.component';
import { PostactivityComponent } from './studentactivity/postactivity/postactivity.component';
import { ActivitiesComponent } from './studentactivity/activities/activities.component';
import { StudentvideoComponent } from './studentvideo/studentvideo.component';



@NgModule({
  declarations: [
    StudenthomeComponent,
    MentorsComponent,
    StudentsidebarComponent,
    StudentactivityComponent,
    StudentblogComponent,
    StudentprofileComponent,
    StudenteditprofileComponent,
    StudentconnectComponent,
    StudentchatComponent,
    BookComponent,
    PostactivityComponent,
    ActivitiesComponent,
    StudentvideoComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,   
    SharedModule,
    FormsModule
  ],
  exports : [

  ]
})
export class StudentModule { }
