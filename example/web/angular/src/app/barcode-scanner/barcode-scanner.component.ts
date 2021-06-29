import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef} from '@angular/core';
import "../dbr";
import { BarcodeScanner, TextResult } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: []
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  bDestroyed = false;
  pScanner:Promise<BarcodeScanner>|null = null;
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef : ElementRef) { }

  async ngOnInit() {
    try{
        let scanner = await (this.pScanner = this.pScanner || BarcodeScanner.createInstance());

        if(this.bDestroyed){
          scanner.destroy();
          return;
        }

        scanner.setUIElement(this.elementRef.nativeElement);
        scanner.onFrameRead = (results:TextResult[]) => {
            if(results.length){
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt:string, result:TextResult) => {
          this.appendMessage.emit(result.barcodeFormatString + ': ' + txt);
        };
        await scanner.open();

    }catch(ex){
        this.appendMessage.emit(ex.message);
        console.error(ex);
    }
  }
  async ngOnDestroy(){
    this.bDestroyed = true;
    if(this.pScanner){
        (await this.pScanner).destroy();
    }
  }
}
