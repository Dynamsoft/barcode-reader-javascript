import 'dart:js';
import 'package:angular/angular.dart';
import 'dart:html';
import 'package:dbrjs_angulardart/dbr.dart';
import 'package:js/js_util.dart';

@Component(
  selector: 'my-app',
  templateUrl: 'app_component.html',
  directives: [coreDirectives]
)
class AppComponent implements OnInit {
  bool bFinishDecodingSample = false;
  BarcodeReader reader = null;
  BarcodeScanner scanner = null;

  void ngOnInit() async {
    // BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
    try{
      if(null == this.reader){
        this.reader = await promiseToFuture<BarcodeReader>(BarcodeReader.createInstance());
      }
      var results = (await promiseToFuture(this.reader.decode("qr.png")) as List<dynamic>);
      var resultsToAlert = [];
      resultsToAlert.add('Sample image:\n');
      for(var result in results){
        var txt = getProperty(result,"barcodeText");
        resultsToAlert.add(txt);
        print(txt);
      }
      window.alert(resultsToAlert.join("\n"));

    }catch(ex){
      window.alert(ex.toString());
      window.console.error(ex);
    }
    this.bFinishDecodingSample = true;
  }

  void onIptChange(Event ev) async {
    var ipt = ev.target as InputElement;
    if(null == this.reader){
      this.reader = await promiseToFuture<BarcodeReader>(BarcodeReader.createInstance());
    }
    try{
      var files = ipt.files;
      var resultsToAlert = JsArray();
      for(var i = 0; i < files.length; ++i){
        var file = files[i];
        resultsToAlert.add(i.toString()+". "+file.name+":");
        var results = (await promiseToFuture(this.reader.decode(file)) as List<dynamic>);
        window.console.log(results);
        for(var result in results){
          var txt = getProperty(result,"barcodeText");
          resultsToAlert.add(txt);
        }
      }
      window.alert(resultsToAlert.join('\n'));
    }catch(ex){
      window.alert(ex.toString());
      window.console.error(ex);
    }
    ipt.value = "";
  }

  void showScanner() async {
    try{
      if(null == this.scanner){
        this.scanner = await promiseToFuture<BarcodeScanner>(BarcodeScanner.createInstance());
      }
      scanner.onFrameRead = (List<dynamic> results) => (results.length > 0 ? window.console.log(results) : null );
      scanner.onUnduplicatedRead = (String txt, JsObject result) =>  window.alert((getProperty(result,"barcodeFormatString") as String) + ': ' + txt);
      scanner.show();
    }catch(ex){
      window.alert(ex.toString());
      throw ex;
    }
  }
}


