export interface Grocery {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

export interface GroceryItems {
  grocery_id: number;
  quantity: number;
}