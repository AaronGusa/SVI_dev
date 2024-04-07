import { Component, ViewChild, HostListener, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './commonelements/header/header.component';
import { FooterComponent } from './commonelements/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthStore } from './app-services/auth/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSidenav
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'SVI_dev';
  user;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;
  isBobbing: boolean = false;


  constructor(public auth: AuthStore,
              private observer: BreakpointObserver) {}

  ngOnInit() {
    this.userGet();
  }

  ngOnChanges() {
    this.userGet();
  }

  userGet() {
    if (this.auth.isLoggedIn$) {
      const getLocal = localStorage.getItem('auth_data');
      this.user = getLocal ? JSON.parse(getLocal)['u_username'] : null;
      //console.log('THIS USER MAIN: ' + this.user)
    } else {
      this.user = '';
    }
  }

  toggleMenuBoy() {
    // console.log('Function Runs')
    // console.log("isMobile: " + this.isMobile)
    // console.log("isCollapsed: " + this.isCollapsed)
    document.querySelector('#burger_container').classList.toggle('burgerOpen');

    if(this.isMobile){
      this.sidenav!.toggle();
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  testButton() {
    console.log('a tag clicked')
  }



  logout() {
    this.auth.logout();
  }

}