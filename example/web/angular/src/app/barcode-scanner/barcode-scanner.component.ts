import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef} from '@angular/core';
import Dynamsoft from "../Dynamsoft";

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.scss']
})
export class BarcodeScannerComponent implements OnInit, OnDestroy {
  bDestroyed = false;
  scanner = null;
  @Output() appendMessage = new EventEmitter();
  constructor(private elementRef : ElementRef) { }

  async ngOnInit() {
    try{
        this.scanner = this.scanner || await Dynamsoft.BarcodeScanner.createInstance();

        if(this.bDestroyed){
          this.scanner.destroy();
          return;
        }

        this.scanner.setUIElement(this.elementRef.nativeElement);
        this.scanner.onFrameRead = results => {
            if(results.length){
                console.log(results);
            }
        };
        this.scanner.onUnduplicatedRead = (txt, result) => {
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
