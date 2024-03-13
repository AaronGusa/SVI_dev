import { Component, Input, Output } from '@angular/core';
import { RouterLink, Routes, RouterModule } from '@angular/router';
@Component({
  selector: 'app-dash-side-menu',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './dash-side-menu.component.html',
  styleUrl: './dash-side-menu.component.css'
})
export class DashSideMenuComponent {
  @Input() usrlvl: number;
  @Input() u_priv: number;
  @Input() buslvl: number;
  @Input() admin: number;
  @Input() u_name: string;
  @Input() profile: string;

}
