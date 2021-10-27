import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  private now:Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  public getTime():string{
    this.now = new Date();
    setTimeout(() =>{this.getTime()}, 10000);
    return `${this.zeroPad(this.now.getHours(),2)}:${this.zeroPad(this.now.getMinutes(),2)}`
  }

  private zeroPad(num:number, size:number):string{
    var stringified = num.toString();
    while (stringified.length < size) stringified = "0" + stringified;
    return stringified;
  }
}
