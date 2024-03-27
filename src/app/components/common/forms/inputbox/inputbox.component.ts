import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inputbox',
  standalone: true,
  imports: [],
  templateUrl: './inputbox.component.html',
  styleUrl: './inputbox.component.scss'
})
export class InputboxComponent {
@Input() label:string = ''
@Input() type:string = ''
@Input() formControlName:string = ''
}
