import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'catalog'
	},
	{
		path: 'catalog',
		loadChildren: () =>
			import('./features/catalog/catalog.routes').then((m) => m.CATALOG_ROUTES)
	},
	{
		path: 'products/:id',
		loadChildren: () =>
			import('./features/product-details/product-details.routes').then(
				(m) => m.PRODUCT_DETAILS_ROUTES
			)
	},
	{
		path: 'favorites',
		loadChildren: () =>
			import('./features/favorites/favorites.routes').then(
				(m) => m.FAVORITES_ROUTES
			)
	},
	{
		path: 'admin',
		canActivate: [adminGuard],
		loadChildren: () =>
			import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES)
	},
	{
		path: '**',
		redirectTo: 'catalog'
	}
];
