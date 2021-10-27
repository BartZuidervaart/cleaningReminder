import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../list-header/list-header.component';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  titleFormControl = new FormControl('', [Validators.required, Validators.nullValidator])
  cycleFormControl = new FormControl('', [Validators.required, Validators.nullValidator])
  descriptionControl = new FormControl('', []);

  constructor(public dialogRef: MatDialogRef<HeaderComponent>,
    private task: TaskService) { }

  ngOnInit(): void {
  }

  public create(): void {
    if (this.titleFormControl.errors == null && this.cycleFormControl.errors == null) {
      if (this.task.getCurrentTask()) {
        this.task.getCurrentTask().addSubTask(new Task(this.titleFormControl.value, this.cycleFormControl.value, this.descriptionControl.value));
      } else {
        this.task.addTask(new Task(this.titleFormControl.value, this.cycleFormControl.value, this.descriptionControl.value));
      }
      this.dialogRef.close('added');
    } else {
      console.warn('cant create', this.titleFormControl.errors, this.cycleFormControl.errors);
    }
  }

}
