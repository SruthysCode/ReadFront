import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/common/home/home.component';
import { Error404Component } from './component/common/error404/error404.component';
import { ErrorComponent } from './component/common/error/error.component';

const routes: Routes = [
  {
    path : '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./component/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./component/student/student.module').then(m=>m.StudentModule)
  }, 
   {
    path: 'mentor',
    loadChildren: () => import('./component/mentor/mentor.module').then(m=>m.MentorModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./component/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path : 'error',
    component : ErrorComponent
  },
 
  {
    path : 'error/:code',
    component : ErrorComponent
  },
  { path: '**', 
   component: Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
