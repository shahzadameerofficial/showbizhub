import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtime',
  standalone: true
})
export class RuntimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    var num = value;
    if (value < 60) {
      return value + " minutes"
    }
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hours and " + rminutes + " minutes";
  }

}
