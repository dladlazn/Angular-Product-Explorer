import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutComponent } from './shell/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
