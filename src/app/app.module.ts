import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/list-header/list-header.component';

import { StorageService } from './services/storage.service';
import { TaskService } from './services/task.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { ListComponent } from './components/list/list.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClockComponent } from './components/clock/clock.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';
import { MenuService } from './services/menu.service';
import { TaskDetailsHeaderComponent } from './components/task-details-header/task-details-header.component';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { DeleteQuestionComponent } from './components/delete-question/delete-question.component';



const angularMaterial =[
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule,
  MatRippleModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatExpansionModule
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    AddTaskComponent,
    ClockComponent,
    TaskDetailsComponent,
    HomePageComponent,
    TaskDetailPageComponent,
    TaskDetailsHeaderComponent,
    DeleteQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    angularMaterial
  ],
  providers: [StorageService, TaskService, MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
