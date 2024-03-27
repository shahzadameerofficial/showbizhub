import { Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { CustomTagComponent } from "../../custom-tag/custom-tag.component";

@Component({
    selector: 'app-auto-complete-card',
    standalone: true,
    templateUrl: './auto-complete-card.component.html',
    styleUrl: './auto-complete-card.component.scss',
    imports: [ChipModule, CustomTagComponent]
})
export class AutoCompleteCardComponent {
  @Input() item:any = {}
}
