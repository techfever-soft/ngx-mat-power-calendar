import { BehaviorSubject, Subject } from 'rxjs';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  public selectedLocale$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'en'
  );
  public selectedTheme$: BehaviorSubject<string> = new BehaviorSubject<string>(
    'primary'
  );

  public get selectedLocale() {
    return this.selectedLocale$.getValue();
  }

  public get selectedTheme() {
    return this.selectedTheme$.getValue();
  }

  onSelectLocale(locale: string): void {
    this.selectedLocale$.next(locale);
  }

  onSelectTheme(theme: string): void {
    this.selectedTheme$.next(theme);
  }
}
