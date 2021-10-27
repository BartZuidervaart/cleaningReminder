import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    if (item != null) {
      return JSON.parse(item);
    }
  }

  public clear():void{
    localStorage.clear();
  }

  public removeItem(key:string):void{
    localStorage.removeItem(key);
  }

  public getStorage(): Map<string, any> {
    const returnMap: Map<string, any> = new Map<string, any>();
    for (var i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key != null) {
        returnMap.set(key, localStorage.getItem(key));
      }
    }
    return returnMap;
  }

  public has(key: string): boolean {
    return this.getStorage().has(key);
  }
}
