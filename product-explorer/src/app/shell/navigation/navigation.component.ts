import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavigationItem = {
  readonly path: string;
  readonly label: string;
  readonly exact?: boolean;
};

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  protected readonly navItems: readonly NavigationItem[] = [
    { path: '/catalog', label: 'Catalog', exact: true },
    { path: '/favorites', label: 'Favorites' },
    { path: '/admin', label: 'Admin' }
  ];
}
