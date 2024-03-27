import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const minimizedValue:number = parseInt(value.toFixed(1));
    return minimizedValue / 2;
  }

}
