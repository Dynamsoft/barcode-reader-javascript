import DBR from "../dbr";
import React from 'react';
import './BarcodeScanner.css';

class BarcodeScanner extends React.Component {
    constructor(props){
        super(props);
        this.bDestroyed = false;
        this.scanner = null;
        this.elRef = React.createRef();
    }
    async componentDidMount(){
        try{
            this.scanner = this.scanner || await DBR.BarcodeScanner.createInstance();

            if(this.bDestroyed){
                this.scanner.destroy();
                return;
            }

            this.scanner.setUIElement(this.elRef.current);
            this.scanner.onFrameRead = results => {
                if(results.length){
                    console.log(results);
                }
            };
            this.scanner.onUnduplicatedRead = (txt, result) => {
                this.props.appendMessage(result.barcodeFormatString + ': ' + txt);
            };
            await this.scanner.open();

        }catch(ex){
            this.props.appendMessage(ex.message);
            console.error(ex);
        }
    }
    componentWillUnmount(){
        this.bDestroyed = true;
        if(this.scanner){
            this.scanner.destroy();
        }
    }
    shouldComponentUpdate(){
        // Never update UI after mount, dbrjs sdk use native way to bind event, update will remove it.
        return false;
    }
    render() {
        return (
            <div ref={this.elRef} className="component-barcode-scanner">
                <svg className="dbrScanner-bg-loading" viewBox="0 0 1792 1792"><path d="M1760 896q0 176-68.5 336t-184 275.5-275.5 184-336 68.5-336-68.5-275.5-184-184-275.5-68.5-336q0-213 97-398.5t265-305.5 374-151v228q-221 45-366.5 221t-145.5 406q0 130 51 248.5t136.5 204 204 136.5 248.5 51 248.5-51 204-136.5 136.5-204 51-248.5q0-230-145.5-406t-366.5-221v-228q206 31 374 151t265 305.5 97 398.5z"></path></svg>
                <svg className="dbrScanner-bg-camera" style={{display:"none"}} viewBox="0 0 2048 1792"><path d="M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"></path></svg>
                <video className="dbrScanner-video" playsInline={true}></video>
                <canvas className="dbrScanner-cvs-drawarea"></canvas>
                <div className="dbrScanner-cvs-scanarea">
                    <div className="dbrScanner-scanlight" style={{display:"none"}}></div>
                </div>
                <select className="dbrScanner-sel-camera"></select>
                <select className="dbrScanner-sel-resolution"></select>
            </div>
        );
    }
}

export default BarcodeScanner;
