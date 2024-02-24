import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../app-services';

@Component({
  selector: 'app-da-users',
  standalone: true,
  imports: [],
  templateUrl: './da-users.component.html',
  styleUrl: './da-users.component.css'
})
export class DaUsersComponent implements OnInit {
  users: any = []; 

  constructor(private userService: UserService) {}

  ngOnInit () {
    this.getAllUsers();
  }

  async getAllUsers() {
    try {
      this.users = await this.userService.fetchUsers();
      console.log(this.users)
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle error gracefully, e.g., show error message to the user
    }
  }
}


