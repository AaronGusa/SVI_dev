import { Component, OnInit, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,} from '@angular/material/dialog';
import { ImageService } from '../../app-services';

@Component({
  selector: 'app-dash-profile-image',
  standalone: true,
  imports: [MatIcon, NgStyle, NgClass, NgTemplateOutlet, MatDialogModule],
  templateUrl: './dash-profile-image.component.html',
  styleUrl: './dash-profile-image.component.css'
})
export class DashProfileImageComponent implements OnInit, ControlValueAccessor{
  @Input() u_id: number;
  file: string = '';
  userPicData: any = [];


  constructor(private imgService: ImageService) {}

  async ngOnInit() {
    await this.getUserPic(this.u_id);
    console.log(this.u_id);
    console.log("Properties of userPicData:", Object.entries(this.userPicData));

  }

  async getUserPic(u_id: number) {
    this.userPicData = await this.imgService.getUserProfileImage(u_id);
    console.log("UserPic Data: " + this.userPicData); 
    // Logging keys (properties) of the object

  }

  writeValue(_file: string): void {
    this.file = _file;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (fileUrl: string) => {
  };

  onTouched = () => {
    
  };

  disabled: boolean = false;

  async onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
        // const _file = URL.createObjectURL(files[0]);
        // this.file = _file;
        const base64String = await this.resizeAndConvertToBase64(files[0]);
        let response: any = await this.imgService.updateUserProfileImage(this.u_id, base64String);

        console.log('On File Change:', this.file);
        // let response: any = await this.imgService.updateUserProfileImage(this.u_id, this.file);
        if (response && response.acknowledged) {
            console.log('Profile image updated successfully:', response);
            this.getUserPic(this.u_id);
        } else {
            console.error('Error updating user profile image:', response);
        }
        this.resetInput();
    }
}

async resizeAndConvertToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
          const image = new Image();
          image.src = reader.result as string;

          image.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 300;
              const MAX_HEIGHT = 300;
              let width = image.width;
              let height = image.height;

              if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              ctx.drawImage(image, 0, 0, width, height);

              const base64String = canvas.toDataURL('image/webp');
              resolve(base64String);
          };
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
  });
}

  resetInput(){
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
}