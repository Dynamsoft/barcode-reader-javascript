import { Component } from '@angular/core';

const dbr = (window as any).dbr;
dbr.licenseKey = 'LICENSE-KEY';
const scanner = new dbr.Scanner({
    onFrameRead: results => { console.log(results); }, // eslint-disable-line
    onNewCodeRead: (txt, result) => { alert(txt); } // eslint-disable-line
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
