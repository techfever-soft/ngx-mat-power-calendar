import { Component } from '@angular/core';
import packageVersion from 'package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx-mat-power-calendar-demo';
  packageVersion!: string;

  constructor() {
    this.packageVersion = packageVersion.version;
  }
}
