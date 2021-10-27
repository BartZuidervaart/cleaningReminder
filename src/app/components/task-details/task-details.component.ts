import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MenuService } from 'src/app/services/menu.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DeleteQuestionComponent } from '../delete-question/delete-question.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  subTaskAdded: boolean = false;
  cycleFormControl: FormControl = new FormControl('', [Validators.nullValidator])
  descriptionControl: FormControl = new FormControl('', []);

  constructor(private tasks: TaskService,
    private menu: MenuService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public getCurrentTask(): Task {
    return this.tasks.getCurrentTask();
  }

  public getCurrentTaskSubTasks(): Task[] {
    return this.getCurrentTask().getSubTasks();
  }

  public getSubTaskMostDueDays(): number {
    if (this.getCurrentTask() && this.getCurrentTask().getSubTaskMostDue()) {
      const subTaskMostDue : Task = this.getCurrentTask().getSubTaskMostDue();
      return subTaskMostDue.daysToGo();
    } else {
      return 0;
    }
  }

  public hasTask(): boolean {
    return this.getCurrentTask() != undefined;
  }

  public getCurrentTaskCycle(): number {
    if (this.getCurrentTask() && this.getCurrentTask().getCycle()) {
      return this.getCurrentTask().getCycle();
    } else {
      return 0;
    }
  }

  public getCurrentTimeTillDue(): number {
    if (this.getCurrentTask() && this.getCurrentTask().daysToGo) {
      return this.getCurrentTask().daysToGo();
    } else {
      return 0;
    }
  }

  public getCurrentTaskTitle(): string {
    if (this.getCurrentTask() && this.getCurrentTask().getTitle()) {
      return this.getCurrentTask().getTitle();
    } else {
      return '';
    }
  }

  public getCurrentTaskDescription(): string {
    if (this.getCurrentTask() && this.getCurrentTask().getDescription()) {
      return this.getCurrentTask().getDescription();
    } else {
      return '';
    }
  }

  public taskIsDone(): void {
    if (this.tasks.getCurrentTask()) {
      this.tasks.taskIsDone(this.tasks.getCurrentTask());
    }
  }

  public saveChanges(): void {
    const task: Task = this.tasks.getCurrentTask();
    this.cycleFormControl.touched ? task.setCycle(this.cycleFormControl.value) : undefined;
    this.descriptionControl.touched ? task.setDescription(this.descriptionControl.value) : undefined;
    this.tasks.saveCurrentTasks();
    this.subTaskAdded = false;
  }

  private deleteTask(): void {
    this.tasks.deleteCurrentTask();
    if (this.tasks.getTaskHierarchy().length == 0) {
      this.menu.goToHome();
    }
    this.saveChanges();
  }

  public inputChanged(): boolean {
    return this.cycleFormControl.touched || this.descriptionControl.touched || this.subTaskAdded;
  }

  public openTask(task:Task):void {
    this.tasks.openTask(task);
  }

  public openDialog():void {
    const dialogRef = this.dialog.open(AddTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added') {
        this.subTaskAdded = true;
      }
      console.log('dialog result', result);
    })
  }

  public openDeleteDialog():void{
    const dialogRef = this.dialog.open(DeleteQuestionComponent);

    dialogRef.afterClosed().subscribe(result => result == 'yes' ? this.deleteTask() : undefined);
  }

}
