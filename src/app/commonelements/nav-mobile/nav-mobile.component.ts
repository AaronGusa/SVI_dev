import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  mmobToggle = true;

  toggler() {
    this.mmobToggle = !this.mmobToggle;
    console.log(this.mmobToggle);
  }

}