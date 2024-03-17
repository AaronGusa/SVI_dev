import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { createWorker, encode } from '@squoosh/lib';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private userProfImageUrl = 'https://stellavibe.onrender.com/images/profImages/user/';
  
  private busProfImageUrl = 'https://stellavibe.onrender.com/images/profImages/bus/';
  private profUserImage = 'https://stellavibe.onrender.com/images/profImages/user_update/';
  private profBusImage = 'https://stellavibe.onrender.com/images/profImages/bus_update/';
  private busServiceImages = 'https://stellavibe.onrender.com/images/busImages';


  constructor(private http: HttpClient) { }

  async squooshIt(file: File) {
    // // Create a worker
    // const worker = createWorker();

    // // Add the file to the worker
    // await worker.addFile(file);

    // // Run the conversion
    // await worker.run((imagePool, options) => {
    //   const image = imagePool.ingestImage(file);
    //   return encode(image, { webp: {} });
    // });

    // // Get the result
    // const encodedData = await worker.encodedWith.webp;

    // // Cleanup
    // await worker.close();

    // // Convert to base64
    // const base64String = btoa(String.fromCharCode.apply(null, encodedData));

    // return 'data:image/webp;base64,' + base64String;
  }


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

  async getUserProfileImage(u_id: number) {
    console.log("Get User Profile Image u_id: " + u_id)
    try {
      const userImage = await this.http.get(`${this.userProfImageUrl}${u_id}`).toPromise();
      console.log(userImage);
      return userImage;
    } catch (error) {
      console.error('Error fetching User Profile Pic: ' + error);
      return error;
    }
  }

  async updateUserProfileImage(u_id: number, userImageData: string) {
    try {
      const updatedUserImage = await this.http.put(`${this.profUserImage}${u_id}`, { u_profImage: userImageData });
      return updatedUserImage;
    } catch (error) {
      console.error('Error updating User Profile Pic: ' + error);
      return error;
    }
  }

  // BUSINESS Profile Image

  async getBusProfileImage(b_id: string) {
    try {
      const busImage = await this.http.get(`${this.busProfImageUrl}${b_id}`)
    } catch (error) {
      console.error('Error fetching business profile pic: ' + error);
      return error;
    }
  }

  async updateBusProfileImage(b_id: number, busImageData: string) {
    try {
      const updatedBusImage = await this.http.put(`${this.profBusImage}${b_id}`, { u_profImage: busImageData });
      return updatedBusImage;
    } catch (error) {
      console.error('Error updating Business Profile Pic: ' + error);
      return error;
    }
  }


}
