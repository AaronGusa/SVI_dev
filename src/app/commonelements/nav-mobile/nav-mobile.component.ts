import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthStore } from '../../app-services/auth/auth.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatMenuModule, MatIconModule, AsyncPipe],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  mmobToggle = true;

  constructor(public auth: AuthStore) {}

  toggler() {
    this.mmobToggle = !this.mmobToggle;
    console.log(this.mmobToggle);
  }

  logout() {
    this.auth.logout;
  }

}