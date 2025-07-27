import {Component, HostBinding, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SHARED_COMPONENTS} from './shared/shared';
import {IdleService} from './services/idle-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...SHARED_COMPONENTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App{
  private idle = inject(IdleService);
  protected title = 'angular-20';
}
