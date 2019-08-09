import React from 'react';
import './App.css';

const Dynamsoft = window.Dynamsoft;

class App extends React.Component {
  showScanner() {
    let scanner = null;
    Dynamsoft.BarcodeScanner.createInstance({
        onFrameRead: results => {console.log(results);},
        onUnduplicatedRead: (txt, result) => {alert(txt);}
    }).then(s => {
        scanner = s;
        scanner.show().catch(ex=>{
            console.log(ex);
            alert(ex.message || ex);
            scanner.hide();
        });
    });
  };
  render() {
    return ( 
      <div className="App">
        <button onClick={() => { this.showScanner() }}>show scanner</button>
      </div> 
    );
  };
}

export default App;
