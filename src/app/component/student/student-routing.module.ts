import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudenthomeComponent } from './studenthome/studenthome.component';
import { MentorsComponent } from './mentors/mentors.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { StudenteditprofileComponent } from './studenteditprofile/studenteditprofile.component';
import { StudentactivityComponent } from './studentactivity/studentactivity.component';
import { StudentblogComponent } from './studentblog/studentblog.component';
import { StudentchatComponent } from './studentchat/studentchat.component';
import { StudentconnectComponent } from './studentconnect/studentconnect.component';
import { BookComponent } from './studentactivity/book/book.component';
import { PostactivityComponent } from './studentactivity/postactivity/postactivity.component';
import { ActivitiesComponent } from './studentactivity/activities/activities.component';
import { StudentvideoComponent } from './studentvideo/studentvideo.component';
import { MarkComponent } from './studentactivity/mark/mark.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mentors',
    pathMatch: 'full',
  },
  {
    path: '',
    component: StudenthomeComponent,
    children: [
      {
        path: 'mentors',
        component: MentorsComponent,
        data: { title: 'Mentors' },
      },
      {
        path: 'profile',
        component: StudentprofileComponent,
        data: { title: 'Profile' },
      },
      {
        path: 'profileedit',
        component: StudenteditprofileComponent,
        data: { title: 'EditProfile' },
      },
      {
        path: 'activity',
        component: StudentactivityComponent,
        data: { title: 'Activity' },
        children: [
          {
            path: 'book',
            component: BookComponent,
            data: { title: 'Book' },
          },
          {
            path: 'postactivity',
            component: PostactivityComponent,
            data: { title: 'PostActivity' },
          },
          {
            path: 'activities',
            component: ActivitiesComponent,
            data: { title: 'Activities' },
          },
          {
            path: 'mark',
            component: MarkComponent,
            data: { title: 'Mark' },
          },
        ],
      },
      {
        path: 'blog',
        component: StudentblogComponent,
        data: { title: 'Blog' },
      },
      {
        path: 'connect',
        component: StudentconnectComponent,
        data: { title: 'Connect' },
      },
      {
        path: 'chat',
        component: StudentchatComponent,
        data: { title: 'Chat' },
      },
      {
        path: 'video',
        component: StudentvideoComponent,
        data: { title: 'Video' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
