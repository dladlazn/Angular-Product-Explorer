import { Routes } from '@angular/router';

export const PRODUCT_DETAILS_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./components/view-product-details/view-product-details.component').then(
				(m) => m.ViewProductDetailsComponent
			)
	}
];