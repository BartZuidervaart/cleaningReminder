import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details-header',
  templateUrl: './task-details-header.component.html',
  styleUrls: ['./task-details-header.component.scss']
})
export class TaskDetailsHeaderComponent implements OnInit {

  constructor(private tasks: TaskService,
    private menu: MenuService) { }

  ngOnInit(): void {
  }

  private getCurrentTask():Task{
    return this.tasks.getCurrentTask();
  }

  public getCurrentTaskTitle():string{
    if(this.getCurrentTask()){
      return this.getCurrentTask().getTitle();
    } else {
      return '';
    }
  }

  public backToHome():void{
    this.menu.goToHome();
  }

  public getHierarchy():Task[]{
    return this.tasks.getTaskHierarchy();
  }

  public goToHierarchy(index:number):void{
    this.tasks.returnToTask(index);
  }

}

