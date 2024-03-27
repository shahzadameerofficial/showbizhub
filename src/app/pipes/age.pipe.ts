import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    var dt = new Date(value);
    let timeDiff = Math.abs(Date.now() - dt.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
