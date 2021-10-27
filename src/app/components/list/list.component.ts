import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private tasks: TaskService,
    public dialog: MatDialog,
    private menu: MenuService) { }

  ngOnInit(): void {
  }

  public getTasks():Task[]{
    return this.tasks.getSortedTasksOnDueDate();
  }

  public getClass(task:Task):string{
    if(task.internalDaysToGo() < 0){
      return 'item-alert-animation';
    } else if (task.internalDaysToGo() == 0){
      return 'item-alert';
    } else if (task.internalDaysToGo() == 1) {
      return 'item-warning';
    } else {
      return 'item';
    }
  }

  public goToTaskDetail(task:Task):void{
    this.tasks.openTask(task);
    this.menu.goToTaskDetails();
  }
}
