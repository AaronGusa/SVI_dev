import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-du-profile',
  standalone: true,
  imports: [FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './du-profile.component.html',
  styleUrl: './du-profile.component.css'
})
export class DuProfileComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),

  })
}
