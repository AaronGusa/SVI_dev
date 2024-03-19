import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dash-profile-image',
  standalone: true,
  imports: [MatIcon, NgStyle, NgClass, NgTemplateOutlet],
  templateUrl: './dash-profile-image.component.html',
  styleUrl: './dash-profile-image.component.css'
})
export class DashProfileImageComponent {
  file: string = '';

  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.file = _file;
      this.resetInput();   
    }
  
  }

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
 

}
