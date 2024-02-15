import { Component } from '@angular/core';
import { RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dash-admin',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './dash-admin.component.html',
  styleUrl: './dash-admin.component.css'
})
export class DashAdminComponent {

}
