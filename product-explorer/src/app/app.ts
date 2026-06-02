import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavigationItem = {
  readonly path: string;
  readonly label: string;
  readonly exact?: boolean;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly navItems: readonly NavigationItem[] = [
    { path: '/catalog', label: 'Catalog', exact: true },
    { path: '/favorites', label: 'Favorites' },
    { path: '/admin', label: 'Admin' }
  ];
}
