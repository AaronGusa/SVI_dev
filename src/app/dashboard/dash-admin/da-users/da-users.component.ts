import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../app-services';
import { User } from '../../../models/user.model';
import { LoadingComponent } from '../../../features/loading/loading.component';

@Component({
  selector: 'app-da-users',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './da-users.component.html',
  styleUrl: './da-users.component.css'
})
export class DaUsersComponent implements OnInit {
  users: any = []; 
  usersTrue: boolean = false;

  constructor(private uService: UserService) {}

  async ngOnInit () {
    await this.getAllUsers();
  }

  async getAllUsers() {
    try {
      const users = await this.uService.fetchUsers();
      console.log( users);
      if (users) {
        this.usersTrue;
        this.users = users;
        
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error gracefully, e.g., show error message to the user
    }
  }
}


