import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
//import { createWorker, encode } from '@squoosh/lib';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private userProfImageUrl = 'https://stellavibe.onrender.com/images/profImages/user/';
  
  private busProfImageUrl = 'https://stellavibe.onrender.com/images/profImages/bus/';
  private busProfImagesUrl = 'https://stellavibe.onrender.com/images/profImages/businesses/';
  private profUserImage = 'https://stellavibe.onrender.com/images/profImages/user_update/';
  private profBusImage = 'https://stellavibe.onrender.com/images/profImages/bus_update/';
  private busServiceImages = 'https://stellavibe.onrender.com/images/busImages/';
  private profUserInit = 'https://stellavibe.onrender.com/images/profileImgInit';
  private busImages = 'https://stellavibe.onrender.com/images/busImages/';


  constructor(private http: HttpClient,
               
    ) { }

  async squooshIt(file: File) {
    //const webbed = await encode() 
  }
  
  
  // async squooshEncode() {
  //   const rawImageData = await this.loadImage();
  //   const webpBuffer = await encode(rawImageData);
  //   return webpBuffer;
  // }


  fetchBusinessImages() {
      try {
        const businessImages = this.http.get(`${this.busServiceImages}`).toPromise();
        return businessImages;
      } catch (error) {
        console.error('Error fetching images: ', error);
        return error;
      }
  };

  // USER Profile Image
  async signUpUserCreate(u_id: number) {
    console.log('Type of U_id: ' + typeof u_id);
  
    try {
      let response = await this.http.post(`${this.profUserInit}`, {"u_id": u_id}, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).toPromise();
  
      console.log(`ProfUserInit URL: ${this.profUserInit}`);
      return response;
    } catch (error) {
      return error;
    }
  }
  // //POST
  // // SignupRecordCreation
  // async signUpUserCreate(u_id: number) {
  //   console.log('Type of U_id: ' + typeof u_id)

  //   try {
  //     let response = await this.http.post(`${this.profUserInit}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: {"u_id": u_id}
  //     });
  //     console.log(`${this.profUserInit}`)
      


  //     return response;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  async fetchBusImages(b_id: string) {
    try {
      let images = await firstValueFrom(this.http.get(`${this.busImages}${b_id}`));
      return images;
    } catch (error) {
      return error;
    }
  }


  async getUserProfileImage(u_id: number) {
    // console.log("Get User Profile Image u_id: " + u_id)
    try {
      let userImage = await this.http.get(`${this.userProfImageUrl}${u_id}`).toPromise();
      if (!userImage) {
       
          // Return a placeholder image
          userImage = { u_profImage: "/SVI_dev/src/assets/images/logo/Backup/Logo1.2.png" };
          console.log(userImage)
          
          return userImage;
      
      }

      return userImage;
    } catch (error) {
      console.error('Error fetching User Profile Pic: ' + error);
      return error;
    }
  }

  async updateUserProfileImage(u_id: number, userImageData: string) {
    try {
        const updatedUserImage = await this.http.put(`${this.profUserImage}${u_id}`, { u_profImage: userImageData }).toPromise();
        return updatedUserImage; // Assuming the server returns data with update status
    } catch (error) {
        console.error('Error updating User Profile Pic:', error);
        return { error: 'Error updating User Profile Pic' };
    }
}

  // BUSINESS Profile Image
  async getBusProfileImages() {
    try {
      const busImages = await this.http.get(`${this.busProfImagesUrl}`).toPromise();
      // console.log(`${this.busProfImageUrl}${b_id}`)
      // console.log('GetBusProfile: ' + busImage);
      return busImages;
    } catch (error) {
      // console.error('Error fetching business profile pic: ' + error);
      return error;
    }
  }

  async getBusProfileImage(b_id: string) {
    try {
      const busImage = await this.http.get(`${this.busProfImageUrl}${b_id}`).toPromise();
      // console.log(`${this.busProfImageUrl}${b_id}`)
      // console.log('GetBusProfile: ' + busImage);
      return busImage;
    } catch (error) {
      // console.error('Error fetching business profile pic: ' + error);
      return error;
    }
  }

  async updateBusProfileImage(b_id: string, busImageData: string) {
    try {
      //console.log(`${this.profBusImage}${b_id}`);
      //console.log(busImageData);
      const updatedBusImage = await firstValueFrom(this.http.put(`${this.profBusImage}${b_id}`, { b_profImage: busImageData }));;
     // console.log(updatedBusImage);
      return updatedBusImage;
    } catch (error) {
      console.error('Error updating Business Profile Pic: ' + error);
      return error;
    }
  }


}
