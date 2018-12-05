@JS()
library app_component;

import 'package:angular/angular.dart';

import 'dart:html';
import 'package:js/js.dart';
import 'dart:js';
import 'dart:convert';

@JS('console.log')
external void log(dynamic str);

@JS("JSON.stringify")
external String stringify(obj);

@JS()
class Promise<T> {
  // external Promise(void executor(void resolve(T result), Function reject));
  external Promise then(Function(T result));
}

@JS("dynamsoft.BarcodeReader")
class DynamsoftBarcodeReader {
  external factory DynamsoftBarcodeReader();
  external Promise<JsArray> decodeFileInMemory(File file);
}

@Component(
  selector: 'my-app',
  styleUrls: ['app_component.css'],
  templateUrl: 'app_component.html',
)

class AppComponent implements OnInit {
  
  final title = 'Angular Dart - Barcode Reader';
  String results = '';
  DynamsoftBarcodeReader reader;

  void ngOnInit() async {
    results = '';
    reader = new DynamsoftBarcodeReader();
  }

  void getResults(JsArray barcodes) {
    int len = barcodes.length;
    var json = jsonDecode(stringify(barcodes));
    var tmp = '';
    for (int i = 0; i < len; i++) {
      tmp += json[i]['BarcodeText'] + '; ';
    }
    
    SpanElement spanElement= document.querySelector('#barcodeResults');
    spanElement.text = tmp;
  }

  void readBarcode() {
    InputElement input = document.querySelector('#uploadImage');
    FileList files = input.files;
    File file = files.item(0);

    if (reader != null) {
      reader.decodeFileInMemory(file).then(
        allowInterop(getResults)
      );
    } else {
      results = file.name;
    }
  }
  
}


