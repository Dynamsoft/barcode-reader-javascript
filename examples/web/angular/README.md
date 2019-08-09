# DbrCdnAngularDefault

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Install Angular CLI

```
npm install -g @angular/cli
```

## How to Use

Cd to the project Directory.

install modules
```
npm install
```

Run the app.
```
ng serve
```

## How to Create

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
<!--
    Warning: Use a specific version in production. (e.g. https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@x.x.x/dist/dbr.min.js)
    Please visit https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx to get trial license.
-->
<script src="https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@7/dist/dbr.min.js" data-productKeys="LICENSE-KEY"></script>
```

Modify `./src/app/app.component.html`:
```html
<button (click)="showScanner()">show scanner</button>
```

Modify `./src/app/app.component.ts`:
```ts
import { Component } from '@angular/core';

const Dynamsoft = (window as any).Dynamsoft;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dbr-cdn-angular-default';

  showScanner() {
    let scanner = null;
    Dynamsoft.BarcodeScanner.createInstance({
        onFrameRead: results => {console.log(results);},
        onUnduplicatedRead: (txt, result) => {alert(txt);}
    }).then(s => {
        scanner = s;
        scanner.show().catch(ex=>{
            console.log(ex);
            alert(ex.message || ex);
            scanner.hide();
        });
    });
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
