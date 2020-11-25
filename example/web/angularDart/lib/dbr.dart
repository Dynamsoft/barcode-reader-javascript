@JS('Dynamsoft.DBR')
library Dynamsoft.DBR;

import "package:js/js.dart";

// @JS()
// class Promise<T> {
//   // external Promise(void executor(void resolve(T result), Function reject));
//   external Promise then(Function(T result));
// }

@JS()
class BarcodeReader {
  external static bool get _bUseFullFeature;
  external static set _bUseFullFeature(bool v);
  external static dynamic createInstance();//Promise<BarcodeReader>
  external dynamic decode(dynamic);//Promise<dynamic>
  external dynamic decodeBase64String(dynamic);//Promise<dynamic>
}

@JS()
class BarcodeScanner {
  external static dynamic createInstance();//Promise<BarcodeScanner>
  external set onFrameRead(dynamic v);//(dynamic results);
  external set onUnduplicatedRead(dynamic v);//(String txt, dynamic result);
  external dynamic show();//Promise<dynamic>
}
