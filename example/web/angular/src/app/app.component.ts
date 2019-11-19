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
        onFrameRead: results => { console.log(results); },
        onUnduplicatedRead: (txt, result) => { alert(txt); }
    }).then(s => {
        scanner = s;
        scanner.show().catch(ex => {
            console.log(ex);
            alert(ex.message || ex);
            scanner.hide();
        });
    });
  }
}
