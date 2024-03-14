export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  unitInStock: number;
  categoryId: number;
  categoryName: string; 
  supplierId: number;
  companyName: string;
}
