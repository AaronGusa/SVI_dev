import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavMobileComponent } from '../nav-mobile/nav-mobile.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavMobileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
