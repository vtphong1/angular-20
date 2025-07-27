import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';
import {Menu} from '../components/menu/menu';

@Component({
  selector: 'app-layout-main',
  imports: [RouterOutlet, Header, Menu, Footer],
  templateUrl: './layout-main.html',
  styleUrl: './layout-main.scss'
})
export class LayoutMain {

}
