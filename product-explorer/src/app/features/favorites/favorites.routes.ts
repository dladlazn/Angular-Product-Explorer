import { Routes } from '@angular/router';

export const FAVORITES_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./components/view-favorites/view-favorites.component').then(
				(m) => m.ViewFavoritesComponent
			)
	}
];