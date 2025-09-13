import {  Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GifsSideMenuComponent } from "../../components/gifs-side-menu/gifs-side-menu.component";



@Component({
  selector: 'app-dashboard-pages',
  imports: [RouterOutlet, GifsSideMenuComponent],
  templateUrl: './dashboard-pages.component.html',
})
export default class DashboardPagesComponent { }
