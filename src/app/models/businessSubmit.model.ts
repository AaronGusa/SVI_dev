export class BusinessSubmit {
  constructor(
    public b_name: string,
    public b_discipline: number,
    public b_street: string,
    public b_city: string,
    public b_state: string,
    public b_zip: string,
    public b_phone: string,
    public b_email: string,
    public b_website: string,
    public b_services: number[],
    public b_rating: number,
    public b_active: boolean,
    public u_id: number,
  ) {}
  }
  