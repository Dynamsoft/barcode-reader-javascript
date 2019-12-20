import { Component, OnDestroy, Input } from '@angular/core';
import Dynamsoft from "../Dynamsoft";

@Component({
  selector: 'app-hello-world',
  templateUrl: './hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent implements OnDestroy {

  @Input() title;
  
  reader = null;
  messageKeyBase = 0;
  messages = [];
  bShowScanner = false;

  constructor() { }

  ngOnDestroy(){
    if(this.reader){
      this.reader.destroy();
    }
  }

  appendMessage(str){
    this.messages.push(str);
    if(this.messages.length > 500){
      ++this.messageKeyBase;
      this.messages.splice(0, 1);
    }
  }
  async onIptChange(event) {
    try{
      this.appendMessage("======== start read... ========");
      let reader = this.reader = this.reader || await Dynamsoft.BarcodeReader.createInstance();
      let input = event.target;
      let files = input.files;
      for(let i = 0; i < files.length; ++i){
        let file = files[i];
        this.appendMessage(file.name + ':')
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
