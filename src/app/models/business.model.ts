export class Business {
    public b_id: string;
    public b_name: string;
    public b_discipline: number;
    public b_street: string;
    public b_city: string;
    public b_state: string;
    public b_zip: string;
    public b_phone: string;
    public b_email: string;
    public b_website: string;
    public b_services: number[];
    public b_rating: number;
    public b_active: boolean;
    public u_id: number;
    public created: Date;
  
    constructor(
      b_id: string,
      b_name: string,
      b_discipline: number,
      b_street: string,
      b_city: string,
      b_state: string,
      b_zip: string,
      b_phone: string,
      b_email: string,
      b_website: string,
      b_services: number[],
      b_rating: number,
      b_active: boolean,
      u_id: number,
      created: Date
    ) {
      this.b_id = b_id;
      this.b_name = b_name;
      this.b_discipline = b_discipline;
      this.b_street = b_street;
      this.b_city = b_city;
      this.b_state = b_state;
      this.b_zip = b_zip;
      this.b_phone = b_phone;
      this.b_email = b_email;
      this.b_website = b_website;
      this.b_services = b_services;
      this.b_rating = b_rating;
      this.b_active = b_active;
      this.u_id = u_id;
      this.created = new Date(created);
    }
  }
  