import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsHeaderComponent } from './task-details-header.component';

describe('TaskDetailsHeaderComponent', () => {
  let component: TaskDetailsHeaderComponent;
  let fixture: ComponentFixture<TaskDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
