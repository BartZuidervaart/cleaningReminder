export class Task {
    private title: string;
    private lastTime: number;
    private cycle: number;
    private description: string;
    private subTasks: Task[] = [];

    constructor(title: string, cycle: number, description: string) {
        this.title = title;
        this.lastTime = Date.now();
        this.cycle = cycle;
        this.description = description;
        this.subTasks = [];
    }

    public injectPlain(task:Task):Task{
        //this function is a pain in the ass.
        //I though angular would have its own fix for this. But it does not.
        this.title = task.title;
        this.lastTime = task.lastTime;
        this.cycle = task.cycle;
        this.description = task.description;
        const createSubtaskArray: Task[] = [];
        task.subTasks.forEach(subTask => {
            const newTask:Task = new Task('', 0, '');
            newTask.injectPlain(subTask);
            createSubtaskArray.push(newTask);
        })
        this.subTasks = createSubtaskArray;
        return this
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getLastTime(): number {
        return this.lastTime;
    }

    public setLastTime(lastTime: number): void {
        this.lastTime = lastTime;
    }

    public getCycle(): number {
        return this.cycle;
    }

    public setCycle(cycle: number): void {
        this.cycle = cycle;
    }

    public getSubTasks(): Task[] {
        return this.subTasks;
    }

    public getSubTaskMostDue(): Task {
        return this.getSubTasks().sort((a, b) => a.internalDaysToGo() - b.internalDaysToGo())[0];
    }

    public setSubTasks(tasks: Task[]): void {
        this.subTasks = tasks;
    }

    public addSubTask(task: Task): void {
        if (!new Set<Task>(this.getSubTasks()).has(task)) {
            this.getSubTasks().push(task);
        }
    }

    public removeSubTask(task: Task): void {
        const returnArray: Task[] = [];
        const taskSet: Set<Task> = new Set<Task>(this.getSubTasks());
        taskSet.delete(task);
        taskSet.forEach(task => returnArray.push(task));
        this.setSubTasks(returnArray);
    }

    private daysSinceLastTime(): number {
        return this.getDayDifference(this.lastTime, Date.now());
    }

    public internalDaysToGo():number {
        var lowestNumber:number = Number.MAX_VALUE;
        if(this.getCycle() > 0){
            lowestNumber = this.daysToGo();
        }
        this.getSubTasks().forEach( task => {
            if(task.getCycle() > 0){
                const subDaysToGo:number = task.internalDaysToGo();
                subDaysToGo < lowestNumber ? lowestNumber = subDaysToGo : undefined;
            }
        });
        return lowestNumber;
    }

    public daysToGo(): number {
        return this.getCycle() + this.daysSinceLastTime();
    }

    public hasNoInternalDaysToGo():boolean {
        return this.internalDaysToGo() == Number.MAX_VALUE;
    }

    private getDayDifference(start: number, end: number): number {
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.round((start - end) / oneDay);
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public taskIsDone(): void {
        this.lastTime = Date.now();
    }
}