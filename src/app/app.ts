import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SHARED_COMPONENTS} from './shared/shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ...SHARED_COMPONENTS],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-20';
}
