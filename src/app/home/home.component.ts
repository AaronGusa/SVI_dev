import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
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
    userpic: "https://yt3.googleusercontent.com/ytc/AIf8zZT_yxWb7R751Kf_hcRcvtFidRJ2cYFQeGUfmDUm=s160-c-k-c0x00ffffff-no-rj",
    testimony: "I slept through another meeting!"},
    {username: "Other Trav",
    userpic: "https://media.licdn.com/dms/image/D5603AQEuNH-aNo6F7w/profile-displayphoto-shrink_200_200/0/1707261040582?e=2147483647&v=beta&t=S8Qff8mGKEl5gPuLxLAqn_vG0tpKW57tnP7BGXDv6Aw",
    testimony: "STALLA VAY MY GUY!"},
  ];


}
