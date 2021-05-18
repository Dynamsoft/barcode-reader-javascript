import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef} from '@angular/core';
import { BarcodeScanner, TextResult } from 'dynamsoft-javascript-barcode';
import DBR from "../dbr";

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: []
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  bDestroyed = false;
  scanner:BarcodeScanner|null = null;
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef : ElementRef) { }

  async ngOnInit() {
    try{
        this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();

        if(this.bDestroyed){
          this.scanner.destroy();
          return;
        }

        this.scanner.setUIElement(this.elementRef.nativeElement);
        this.scanner.onFrameRead = (results:TextResult[]) => {
            if(results.length){
                console.log(results);
            }
        };
        this.scanner.onUnduplicatedRead = (txt:string, result:TextResult) => {
          this.appendMessage.emit(result.barcodeFormatString + ': ' + txt);
        };
        await this.scanner.open();

    }catch(ex){
        this.appendMessage.emit(ex.message);
        console.error(ex);
    }
  }
  ngOnDestroy(){
    this.bDestroyed = true;
    if(this.scanner){
        this.scanner.destroy();
    }
  }
}
