import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
    constructor(
        private router:Router,
        private task: TaskService
    ){

    }

    public goToTaskDetails():void{
        this.navigate('task-details');
    }

    public goToHome():void{
        this.task.clearHierarchy();
        this.navigate('home');
    }

    private navigate(path:string):void{
        this.router.navigate([path]);
    }
}