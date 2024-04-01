import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MentorhomeComponent } from './mentorhome/mentorhome.component';
import { StudentsComponent } from './students/students.component';
import { MentorprofileComponent } from './mentorprofile/mentorprofile.component';
import { MentoreditprofileComponent } from './mentoreditprofile/mentoreditprofile.component';
import { MentoractivityComponent } from './mentoractivity/mentoractivity.component';
import { MentorblogComponent } from './mentorblog/mentorblog.component';
import { MentorconnectComponent } from './mentorconnect/mentorconnect.component';
import { MentorchatComponent } from './mentorchat/mentorchat.component';
import { TodoComponent } from './mentoractivity/todo/todo.component';
import { BookComponent } from './mentoractivity/book/book.component';
import { RanklistComponent } from './mentoractivity/ranklist/ranklist.component';
import { MarksComponent } from './mentoractivity/marks/marks.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MentorhomeComponent,
    children: [
      {
        path: 'students',
        component: StudentsComponent,
        data: { title: 'Students' },
      },
      {
        path: 'profile',
        component: MentorprofileComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'profileedit',
        component: MentoreditprofileComponent,
        data: { title: 'ProfileEdit' },
      },
      {
        path: 'activity',
        // redirectTo : 'todo',
        // pathMatch : 'full',
        component: MentoractivityComponent,
        data: { title: 'Activity' },
        children: [
          {
            path: 'todo',
            component: TodoComponent,
            data: { title: 'Todo' },
          },
          {
            path: 'book',
            component: BookComponent,
            data: { title: 'Book' },
          },
          {
            path: 'assignmark',
            component: MarksComponent,
            data: { title: 'AssignMarks' },
          },
         
          {
            path: 'ranklist',
            component: RanklistComponent,
            data: { title: 'Ranklist' },
          },
        ],
      },
      {
        path: 'blog',
        component: MentorblogComponent,
        data: { title: 'Blog' },
      },
      {
        path: 'connect',
        component: MentorconnectComponent,
        data: { title: 'Connect' },
      },
      {
        path: 'chat',
        component: MentorchatComponent,
        data: { title: 'Chat' },
      },
      {
        path: 'video',
        component: VideoComponent,
        data: { title: 'Video' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
