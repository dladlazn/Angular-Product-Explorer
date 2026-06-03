import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./components/view-admin/view-admin.component').then(
				(m) => m.ViewAdminComponent
			)
	}
];