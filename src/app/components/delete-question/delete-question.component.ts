import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.scss']
})
export class DeleteQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskDetailsComponent>) { }

  ngOnInit(): void {
  }

  public button(answer:string):void{
    this.dialogRef.close(answer);
  }
}
