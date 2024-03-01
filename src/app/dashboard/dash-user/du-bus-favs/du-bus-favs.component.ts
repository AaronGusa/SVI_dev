import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserService } from '../../../app-services'; 

@Component({
  selector: 'app-du-bus-favs',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './du-bus-favs.component.html',
  styleUrl: './du-bus-favs.component.css'
})
export class DuBusFavsComponent {

}
