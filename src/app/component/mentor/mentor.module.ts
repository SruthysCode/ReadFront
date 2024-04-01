import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { MentorhomeComponent } from './mentorhome/mentorhome.component';
import { StudentsComponent } from './students/students.component';
import { MentorsidebarComponent } from './mentorsidebar/mentorsidebar.component';
import { MentorprofileComponent } from './mentorprofile/mentorprofile.component';
import { MentoreditprofileComponent } from './mentoreditprofile/mentoreditprofile.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MentoractivityComponent } from './mentoractivity/mentoractivity.component';
import { MentorblogComponent } from './mentorblog/mentorblog.component';
import { MentorchatComponent } from './mentorchat/mentorchat.component';
import { MentorconnectComponent } from './mentorconnect/mentorconnect.component';
import { TodoComponent } from './mentoractivity/todo/todo.component';
import { BookComponent } from './mentoractivity/book/book.component';
import { RanklistComponent } from './mentoractivity/ranklist/ranklist.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MarksComponent } from './mentoractivity/marks/marks.component';
import { VideoComponent } from './video/video.component';


@NgModule({
  declarations: [
    MentorhomeComponent,
    StudentsComponent,
    MentorsidebarComponent,
    MentorprofileComponent,
    MentoreditprofileComponent,
    MentoractivityComponent,
    MentorblogComponent,
    MentorchatComponent,
    MentorconnectComponent,
    TodoComponent,
    BookComponent,
    RanklistComponent,
    MarksComponent,
    VideoComponent,
    
  ],
  imports: [
    CommonModule,
    MentorRoutingModule,
    ReactiveFormsModule,
    PdfViewerModule,
    FormsModule
  ]
})
export class MentorModule { }
