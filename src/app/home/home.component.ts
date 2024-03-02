import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  SV_testimonies = [
    {username: "Travis",
    userpic: "../../assets/images/userpics/Trav.jpeg",
    testimony: "STELLLLLLLLLLLLLLLAAAAAAAAAAAAAAAAAA"},
     {username: "Sam",
    userpic: "https://fireflyautomatix.com/wp-content/uploads/2023/12/FF-TEAM-.jpg",
    testimony: "Aaron's a real sun of a gon"},
    {username: "Aaron",
    userpic: "https://static.wixstatic.com/media/f729b5_b6a7f7b0b24c4399b94117b6ebb059ca~mv2.png/v1/crop/x_864,y_0,w_2967,h_3393/fill/w_722,h_825,al_c,q_90,usm_0.33_1.00_0.00,enc_auto/IMG_9116-AAE-24_69M.png",
    testimony: "I slept through another meeting!"},
    {username: "Other Trav",
    userpic: "https://media.licdn.com/dms/image/D5603AQEuNH-aNo6F7w/profile-displayphoto-shrink_200_200/0/1707261040582?e=2147483647&v=beta&t=S8Qff8mGKEl5gPuLxLAqn_vG0tpKW57tnP7BGXDv6Aw",
    testimony: "STALLA VAY MY GUY!"},
  ];


}
