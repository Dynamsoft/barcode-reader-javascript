import { Component } from '@angular/core';

declare var dynamsoft: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'Dynamsoft Barcode Reader';
	results = '';
	reader;

	constructor() {
		const env = this;
		dynamsoft.dbrEnv = dynamsoft.dbrEnv || {};
		dynamsoft.dbrEnv.resourcesPath = 'https://demo.dynamsoft.com/dbr_wasm/js';
		//https://www.dynamsoft.com/CustomerPortal/Portal/TrialLicense.aspx
		dynamsoft.dbrEnv.licenseKey =
			't0068NQAAADAG7KITlB55pjkzxD1rnTRhcZ/KCqVoXp6vWXmjRUbhvkCl58F+mqFnhIo1Oul/qB0moA8nA1erzTPYsb4FVLk=';
		dynamsoft.dbrEnv.bUseWorker = true;
		dynamsoft.dbrEnv.onAutoLoadWasmSuccess = function() {
			env.reader = new dynamsoft.BarcodeReader();
			document.getElementById('anim-loading').style.display = 'none';
		};
		dynamsoft.dbrEnv.onAutoLoadWasmError = function(ex) {
			alert(ex);
		};

		let bMobileSafari =
			/Safari/.test(navigator.userAgent) &&
			/iPhone/.test(navigator.userAgent) &&
			!/Chrome/.test(navigator.userAgent);

		let script = document.getElementById('script');
		if (!bMobileSafari) {
			(<HTMLScriptElement >script).src = 'https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.2.min.js';
		} else {
			// bMobileSafari
			// js for mobile(safari especially): smaller, compile quicker, need less memory, but not that stable
			(<HTMLScriptElement >script).src = 'https://demo.dynamsoft.com/dbr_wasm/js/dbr-6.3.0.2.mobile.min.js';
		}
	}

	readBarcode(): void {
		const env = this;
		let image = (<HTMLInputElement>document.getElementById('uploadImage')).files[0];
		if (!image) {
			alert('Please add an image');
			return;
		}
		this.reader
			.decodeFileInMemory(image)
			.then(function(results) {
				var txts = [];
				for (var i = 0; i < results.length; ++i) {
					txts.push(results[i].BarcodeText);
				}
				env.results = JSON.stringify(txts);
			})
			.catch((ex) => {
				alert(ex);
			});
	}
}
