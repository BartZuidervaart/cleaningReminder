import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'task-details', component: TaskDetailPageComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
