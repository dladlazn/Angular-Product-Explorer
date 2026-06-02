export type ProductCategory = 'Accessories' | 'Audio' | 'Computers' | 'Displays' | 'Networking';

export type ProductSort = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: ProductCategory;
  readonly price: number;
  readonly rating: number;
  readonly inStock: boolean;
}

export interface CatalogFilters {
  readonly query: string;
  readonly category: ProductCategory | 'all';
  readonly sort: ProductSort;
  readonly showInStockOnly: boolean;
}
