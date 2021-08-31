import { Component, Input, ElementRef, ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import "../dbr";
import { BarcodeReader } from 'dynamsoft-javascript-barcode';

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: []
})
export class HelloWorldComponent implements AfterViewChecked, OnDestroy {

  @Input() title:string = null as any as string;
  @ViewChild('divMessage', {static: false}) divMessage: ElementRef = null as any as ElementRef;
  
  pReader:Promise<BarcodeReader>|null = null;
  messageKeyBase = 0;
  messages:string[] = [];
  needMessage2Bottom = false;
  bShowScanner = false;

  constructor() { }

  ngAfterViewChecked(){
    if(this.needMessage2Bottom){
      this.needMessage2Bottom = false;
      this.divMessage.nativeElement.scrollTop = this.divMessage.nativeElement.scrollHeight;
    }
  }

  async ngOnDestroy(){
    if(this.pReader){
      (await this.pReader).destroy();
    }
  }

  appendMessage(str:string){
    this.messages.push(str);
    if(this.messages.length > 500){
      ++this.messageKeyBase;
      this.messages.splice(0, 1);
    }
    this.needMessage2Bottom = true;
  }
  async onIptChange(event:Event) {
    try{
      this.appendMessage("======== start read... ========");
      let reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
      let input = event.target as HTMLInputElement;
      let files = input.files as FileList;
      for(let i = 0; i < files.length; ++i){
        let file = files[i];
        this.appendMessage(file.name + ':');
        let results = await reader.decode(file);
        for(let result of results){
          this.appendMessage(result.barcodeText);
        }
      }
      input.value = "";
      this.appendMessage("======== finish read ========");
    }catch(ex){
      this.appendMessage(ex.message);
      console.error(ex);
    }
  }
  showScanner(){
    this.bShowScanner = true;
  }
  hideScanner(){
    this.bShowScanner = false;
  }

}
