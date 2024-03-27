import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDate',
  standalone: true
})
export class ReleaseDatePipe implements PipeTransform {

  transform(dateString: string, ...args: unknown[]): unknown {
    const currentDate = new Date();
    const date = new Date(dateString);
    const diffTime = Math.abs(currentDate.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // in past
    if (diffDays > 14 && currentDate > date) {
      return `Released on ${this.formatDate(date)}`;
    } else if (diffDays < 14 && currentDate > date ) {
      return `Released ${diffDays} days ago`;
    } else if (diffDays < 14 && date > currentDate) {
      return `${diffDays} days to go`;
    } else {
      return `Releasing on ${this.formatDate(date)}`;
    }
  }
  // if 30 days old > released on 13th Jan 2024 | 
  // if 14 days from now > 13 days to go
  // if inside 30 days old > released 23 days ago
  // if more than 14 days from now > releasing on 14th march 2024

  private formatDate(date: Date): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${monthNames[monthIndex]}, ${year}`;
  }

}
