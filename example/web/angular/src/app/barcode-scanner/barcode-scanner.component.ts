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
        let scanner = this.scanner = this.scanner || await Dynamsoft.BarcodeScanner.createInstance();

        if(this.bDestroyed){
            this.destroy();
            return;
        }

        scanner.setUIElement(this.elementRef.nativeElement);
        scanner.onFrameRead = results => {
            if(results.length){
                console.log(results);
            }
        };
        scanner.onUnduplicatedRead = (txt, result) => {
          this.appendMessage.emit(result.barcodeFormatString + ': ' + txt);
        };
        await scanner.open();

        if(this.bDestroyed){
            this.destroy();
            return;
        }

    }catch(ex){
        this.appendMessage.emit(ex.message);
        console.error(ex);
    }
  }
  ngOnDestroy(){
    
  }
  async destroy(){
    this.bDestroyed = true;
    if(this.scanner){
        this.scanner.close();
        this.scanner.destroy();
        this.scanner = null;
    }
}
}
