import { Component } from '@angular/core';
import { BusSignComponent } from '../commonpages/signup-user/bus-sign/bus-sign.component';

@Component({
  selector: 'app-test-dev-page',
  standalone: true,
  imports: [BusSignComponent],
  templateUrl: './test-dev-page.component.html',
  styleUrl: './test-dev-page.component.css'
})
export class TestDevPageComponent {

}
