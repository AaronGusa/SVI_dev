export class User {
    public u_id: number;
    public u_phone: string;
    public u_email: string;
    public u_street: string;
    public u_city: string;
    public u_country: string;
    public u_username: string;
    public u_fname: string;
    public u_lname: string;
    public u_zip: string;
    public u_priv: number;
    public hashedPassword: string;
    public u_favs: [
      {
        b_id: string;
        s_id: number[];
        ufav_created: Date;
        ufav_last_updated: Date; 
        ufav_notes: string;
        sub_active: boolean; 
        ufav_unfav: Date;
      }
    ];
  
    constructor(
      u_id: number,
      u_phone: string,
      u_email: string,
      u_street: string,
      u_city: string,
      u_country: string,
      u_username: string,
      u_fname: string,
      u_lname: string,
      u_zip: string,
      u_priv: number,
      hashedPassword: string,
      u_favs: [
        {
        b_id: string;
        s_id: number[];
        ufav_created: Date;
        ufav_last_updated: Date; 
        ufav_notes: string;
        sub_active: boolean; 
        ufav_unfav: Date;
        }
      ]
    ) {
      this.u_id = u_id;
      this.u_phone = u_phone;
      this.u_email = u_email;
      this.u_street = u_street;
      this.u_city = u_city;
      this.u_country = u_country;
      this.u_username = u_username;
      this.u_fname = u_fname;
      this.u_lname = u_lname;
      this.u_zip = u_zip;
      this.u_priv = u_priv;
      this.hashedPassword = hashedPassword;
      this.u_favs = u_favs;
    }
  }
  