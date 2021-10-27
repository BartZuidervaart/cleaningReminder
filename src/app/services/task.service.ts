import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private static readonly TASK = 'tasks';
    private tasks: Set<Task> = new Set<Task>();

    private taskHierarchy: Task[] = [];

    constructor(private storage: StorageService) {
        this.loadTasksFromMemory();
    }

    public getTasks(): Task[] {
        const array: Task[] = [];
        this.tasks.forEach(task => array.push(task));
        return array;
    }

    public getSortedTasksOnDueDate(): Task[] {
        return this.getTasks().sort((a, b) => a.internalDaysToGo() - b.internalDaysToGo());
    }

    public addTask(task: Task): void {
        this.tasks.add(task);
        this.saveCurrentTasks();
    }

    public removeTask(task: Task): void {
        this.tasks.delete(task);
        this.saveCurrentTasks();
    }

    public taskIsDone(task: Task): void {
        task.taskIsDone();
        this.saveCurrentTasks();
    }

    public removeSubTask(): void {
        const currentTask: Task = this.getCurrentTask();
        this.returnToParentTask();
        this.getCurrentTask().removeSubTask(currentTask);
    }

    public saveCurrentTasks(): void {
        this.storage.removeItem(TaskService.TASK);
        this.storage.setItem(TaskService.TASK, this.getTasks());
        this.loadTasksFromMemory();
    }

    private loadTasksFromMemory(): void {
        this.tasks.clear();
        if (!this.storage.getItem(TaskService.TASK)) {
            this.storage.setItem(TaskService.TASK, []);
        }
        const tasks: Task[] = this.storage.getItem(TaskService.TASK);
        if (tasks && tasks != null) {
            tasks.forEach(task => this.tasks.add(new Task('',0,'').injectPlain(task)));
        }
    }

    public getTaskHierarchy(): Task[] {
        return this.taskHierarchy;
    }

    public clearHierarchy(): void {
        this.taskHierarchy = [];
    }

    public getCurrentTask(): Task {
        return this.getTaskHierarchy()[this.getTaskHierarchy().length - 1];
    }

    public returnToTask(index : number):void{
        if(this.getTaskHierarchy().length >= index){
            this.taskHierarchy.splice(index+1);
        }
    }

    public openTask(task: Task): void {
        this.taskHierarchy.push(task);
    }

    public returnToParentTask(): void {
        this.taskHierarchy.length > 0 ? this.taskHierarchy.splice(this.taskHierarchy.length-1) : undefined;
    }

    public deleteCurrentTask(): void {
        if (this.getTaskHierarchy().length > 0) {
            if (this.getTaskHierarchy().length == 1) {
                this.removeTask(this.getCurrentTask());
            } else {
                this.removeSubTask();
            }
        }
    }
}