# DbrCdnAngularDefault

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## How to Create

Install Angular CLI:
```
npm install -g @angular/cli
```

Create a Angular Project, select default config:
```
ng new dbr-cdn-angular-default
```

Cd to the project Directory:
```
cd dbr-cdn-angular-default
```

Add a `<script>` in `./src/index.html`:
```html
<!--Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@6/dist/dbr.min.js)-->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode/dist/dbr.min.js"></script>
```

Modify `./src/app/app.component.html`:
```html
<button (click)="openScanner()">open scanner</button>
```

Modify `./src/app/app.component.ts`:
```ts
import { Component } from '@angular/core';

let dbr = (window as any).dbr;
dbr.licenseKey = 'LICENSE-KEY';
let scanner = new dbr.Scanner({
    onFrameRead: results => {console.log(results);}, // eslint-disable-line
    onNewCodeRead: (txt, result) => {alert(txt);} // eslint-disable-line
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dbr-cdn-angular-default';

  openScanner() {
    scanner.open();
  }
}
```

Run the app.
```
ng serve
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
