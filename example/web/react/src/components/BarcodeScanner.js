import Dynamsoft from "../Dynamsoft";
import React from 'react';

class BarcodeScanner extends React.Component {
    constructor(props){
        super(props);
        this.bDestroyed = false;
        this.scanner = null;
        this.elRef = React.createRef();
    }
    async componentDidMount(){
        try{
            let scanner = this.scanner = this.scanner || await Dynamsoft.BarcodeScanner.createInstance();

            if(this.bDestroyed){
                this.destroy();
                return;
            }

            scanner.setUIElement(this.elRef.current);
            scanner.onFrameRead = results => {
                if(results.length){
                    console.log(results);
                }
            };
            scanner.onUnduplicatedRead = (txt, result) => {
                this.props.appendMessage(result.barcodeFormatString + ': ' + txt);
            };
            await scanner.open();

            if(this.bDestroyed){
                this.destroy();
                return;
            }

        }catch(ex){
            this.props.appendMessage(ex.message);
            console.error(ex);
        }
    }
    componentWillUnmount(){
        if(this.reader){
            this.destroy();
        }
    }
    shouldComponentUpdate(){
        // Never update UI after mount, the sdk use native way to bind event, update will remove it.
        return false;
    }
    render() {
        return (
            <div ref={this.elRef}>
                <select className="dbrScanner-sel-camera"></select>
                <select className="dbrScanner-sel-resolution"></select>
                <br/>
                <video className="dbrScanner-video" style={style.video}></video>
            </div>
        );
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

const style = {
    video: {
        width: "640px",
        height: "480px",
        border: "1px solid black"
    }
}

export default BarcodeScanner;
