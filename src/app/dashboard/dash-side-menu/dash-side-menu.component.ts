import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { RouterLink, Routes, RouterModule } from '@angular/router';
import { Observable, Subscription, lastValueFrom, map, toArray } from 'rxjs';
import { LoadingComponent } from '../../features/loading/loading.component';

@Component({
  selector: 'app-dash-side-menu',
  standalone: true,
  imports: [RouterLink, RouterModule, LoadingComponent],
  templateUrl: './dash-side-menu.component.html',
  styleUrl: './dash-side-menu.component.css'
})
export class DashSideMenuComponent implements OnInit, OnChanges{
  @Input() usrlvl: number;
  @Input() u_priv: number;
  @Input() buslvl: number;
  @Input() admin: number;
  @Input() u_name: string;
  @Input() profile: Observable<any>;
  @Input() _uPriv: EventEmitter<number>; // Declare _uPriv as an EventEmitter
  @Input() data: any;
  isLoading: Boolean = true;
  prof;
  name: string;
  constructor() {}

  ngOnInit() {
    this.checkInputs();
    
  }

  ngOnChanges() {
    this.checkInputs();
    this.prof = JSON.parse(JSON.stringify((this.profile))) 
  }

  private async checkInputs() {
    if (
      this.usrlvl !== undefined &&
      this.u_priv !== undefined &&
      this.buslvl !== undefined &&
      this.admin !== undefined &&
      this.u_name !== undefined &&
      this.profile !== undefined &&
      this._uPriv !== undefined &&
      this.data !== undefined
    ) {
      // if (this.profile) {
      //   this.profile.subscribe((data) => {
      //     this.prof = JSON.parse(JSON.stringify(data));
      //   });
      // }
      this.name = this.profile['u_fname'];
      this.isLoading = false;
      //console.log('Profile: ' + Object.entries(this.prof))
    }
  }
}