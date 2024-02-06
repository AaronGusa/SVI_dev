import { Service } from "./service.model";
export interface Category {
    _id: string;
    cat_id: number;
    cat: string;
    services: Service[];
  }