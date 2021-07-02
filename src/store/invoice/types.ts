import { ProductType } from "../product/types";

export interface InvoiceType {
  paymentDate: any;
  tax: number;
  shippingFee: number;
  isConfirm: boolean;
  confirmDate: any;
  _id: string;
  fromStaff: {
    invoices: string[];
    isActive: boolean;
    _id: string;
    firstname: string;
    lastname: string;
    gender: string;
    contactEmail: string;
    address: string;
    company: string;
    phone: string;
    avatar: any;
  };
  clientInfo: {
    isActive: boolean;
    _id: string;
    fullname: string;
    gender: string;
    email: string;
  };
  productList: ProductType[];
  total: number;
  createdAt: any;
  updatedAt: any;
}
