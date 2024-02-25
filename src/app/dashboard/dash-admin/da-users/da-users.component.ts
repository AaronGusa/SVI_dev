import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../app-services';
import { User } from '../../../models/user.model';
import { LoadingComponent } from '../../../features/loading/loading.component';
import { Subscription } from 'rxjs';

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
  loading: boolean = true;
  error: string;
  private usersSubscription: Subscription;

  constructor(private uService: UserService) {}

  async ngOnInit () {
    // await this.getAllUsers();
    this.usersSubscription = this.uService.fetchUsers().subscribe({
      next: (users: User[]) => {
        console.log(users);
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
        this.error = 'Failed to fetch users. Please try again later.';
      }
    });
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


