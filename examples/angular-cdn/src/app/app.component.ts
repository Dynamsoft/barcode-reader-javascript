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
