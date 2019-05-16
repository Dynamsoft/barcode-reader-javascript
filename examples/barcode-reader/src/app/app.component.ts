import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { environment } from 'src/environments/environment';

declare var dynamsoft: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Dynamsoft Barcode Reader';
  results = '';
  scanner;

  constructor() {
    var env = this;
		
	dynamsoft.BarcodeReader.licenseKey = 't0068MgAAAAxT9peWqAbLNI2gDlg9yk8dqzhp5Me5BNCgFIg2p5X+8TPYghCr9cz6TNFlkmkpzOJelNHJaQMWGe7Bszoxoo4=';
	
	env.scanner = new dynamsoft.BarcodeReader.Scanner({
		onFrameRead: results => {console.log(results);},
		onNewCodeRead: (txt, result) => {alert(txt);}
	});
	
	env.scanner.open().catch(ex=>{
		console.log(ex);
		alert(ex.message || ex);
		env.scanner.close();
	});
    
  }

}