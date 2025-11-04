export interface CreateProductDto {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}

export interface UpdateProductDto {
  name: string;
  image: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
}
