import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-release-status',
  standalone: true,
  imports: [],
  templateUrl: './release-status.component.html',
  styleUrl: './release-status.component.scss'
})
export class ReleaseStatusComponent implements OnChanges {
  @Input() releaseDate: string | any;
  status: string = '';
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.releaseDate) {
      this.calculateStatus(this.releaseDate)
    }
  }
  calculateStatus(dateString: string) {
    if (!dateString) {
      this.status = 'Unknown'
      return;
    }

    // Convert dateString to a Date object
    const date = new Date(dateString);

    // Calculate the difference in milliseconds between today and the provided date
    const difference = date.getTime() - Date.now();

    // Calculate the difference in days
    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    // Compare the difference with the thresholds
    if (daysDifference <= 14 && daysDifference >= 0) {
      // Date is within 14 days from today
      this.status = 'upcoming';
    } else if (daysDifference < 0 && daysDifference >= -14) {
      // Date is within 14 days before today

      this.status = 'new';
    } else if (daysDifference > 14) {
      // Date is more than 14 days from today
      this.status = `Coming in ${date.toLocaleDateString('default', { month: 'long' })}`;
    } else {
      // Date is coming up in next 14 days
      this.status = 'released';
    }

  }
}
