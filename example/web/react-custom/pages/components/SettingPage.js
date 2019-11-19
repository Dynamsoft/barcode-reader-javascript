import React from 'react';
import 'antd/dist/antd.css'
import { PageHeader,Menu, Icon, Button,Radio, Card,Switch,Divider,Checkbox,Row,Col,message } from 'antd';
import '../../static/css/SettingPage.css';
import '../../static/css/Layout.css';


const { SubMenu } = Menu;

function CutOff(){
    return(
        <Divider style={{margin:"10px 0"}}/>
    )
}

const AttributeStyle = {
    padding:"5px"
};


let settingsFromPage = {
    resolution:[1280,720],
    barcodeformat:503318527,
    localization:[2,0,0,0,0,0,0,0],
    deblurlevel : 0,
};


class VideoSource extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"camera0",
            vs:"",
        }
    }

    componentDidMount(){
        console.log("get cameraList==null?:",cameraInfo.cameraList==null);
        var videoSourceFromScanner = cameraInfo.cameraList!=null?cameraInfo.cameraList.map((ri,index)=>
            <Radio key={index} style={AttributeStyle} value={"camera"+index}>{ri.label}</Radio>
            ):"no camera";
        this.setState({
            vs:videoSourceFromScanner,
        })
    }

    onSelectChange = e =>{
        this.setState({
            value:e.target.value,
        });
    };
    
    render(){
        return(
        <Menu
        mode="inline"
        >
        <SubMenu
            key="video"
            title={
            <span>
                <Icon type="camera" />
                <span>Video Source</span>
            </span>
            }
        >
            {/* <Menu.Item key="camera1">{cameraInfo.cameraList[0].label}</Menu.Item> */}
            {/* <Menu.Item key="camera2">Camera 2</Menu.Item> */}
            <Radio.Group style={{paddingLeft:'20px'}} onChange={this.onSelectChange.bind(this)} defaultValue={"camera0"}>
                {this.state.vs}
                {fr+"xx"}
            </Radio.Group>
        </SubMenu>
        </Menu>
        
        )
    }
    

}


class VideoResolution extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:0,
            resolution:[1280,720]
        }
    }

    componentDidUpdate(){
        settingsFromPage.resolution=this.state.resolution;
        console.log(this.state.resolution);
    }

    onSelectChange = e =>{
        this.setState({
            value:e.target.value,
            resolution:e.target.res,
        });
    };


    render(){
        return(
        <Menu
        mode="inline"
        >
            <SubMenu
                key="resolution"
                title={
                <span>
                    <Icon type="eye"/>
                    <span>Video Resolution</span>
                </span>
                }
            >
                <Radio.Group style={{paddingLeft:'20px'}} onChange={this.onSelectChange.bind(this)} defaultValue="1280,720">
                    <Radio style={AttributeStyle} value={"3840,2160"} res={[3840,2160]}>3840*2160</Radio>
                    <Radio style={AttributeStyle} value={"2560,1440"} res={[2560,1440]}>2560*1440</Radio>
                    <Radio style={AttributeStyle} value={"1920,1080"} res={[1920,1080]}>1920*1080</Radio>
                    <Radio style={AttributeStyle} value={"1600,1200"} res={[1600,1200]}>1600*1200</Radio>
                    <Radio style={AttributeStyle} value={"1280,720"} res={[1280,720]}>1280*720</Radio>
                    <Radio style={AttributeStyle} value={"800,600"} res={[800,600]}>800*600</Radio>
                    <Radio style={AttributeStyle} value={"640,480"} res={[640,480]}>640*480</Radio>
                    <Radio style={AttributeStyle} value={"640,360"} res={[640,360]}>640*360</Radio>
                </Radio.Group>
            </SubMenu>      
        </Menu>   
        )
    }   
}


// const options=['1D','PDF417','QR Code','Data Matrix','Aztec Code'];
var Dynamsoft;
const defaultCheckList = ['1D','PDF417','QR Code','Data Matrix','Aztec Code'];
var _1D ;
var _PDF417;
var _QRCODE;
var _DataMatrix;
var _AztecCODE;
class BarcodeFormat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            checkedList:defaultCheckList,
        }
    }

    onChange = checkedList=>{
        this.setState({
            checkedList,
        })
    }

    onSelectFormat = e=>{
        console.log(e.target.format,e.target.value,this.state.checkedList.indexOf(e.target.value)!=-1);
        this.setState({
            formatIDs:this.state.checkedList.indexOf(e.target.value)!=-1?(this.state.formatIDs-e.target.format):(this.state.formatIDs+e.target.format)
            //formatIDs:this.state.formatIDs
        })
    }

    componentDidMount(){
        Dynamsoft = window.Dynamsoft;
        _1D = Dynamsoft.EnumBarcodeFormat.OneD;
        _PDF417 = Dynamsoft.EnumBarcodeFormat.PDF417;
        _QRCODE = Dynamsoft.EnumBarcodeFormat.QR_CODE;
        _DataMatrix = Dynamsoft.EnumBarcodeFormat.DATAMATRIX;
        _AztecCODE = Dynamsoft.EnumBarcodeFormat.AZTEC;
        this.setState({
            formatIDs:_1D+_PDF417+_QRCODE+_DataMatrix+_AztecCODE,
        }) 
    }

    componentDidUpdate(){
        console.log(this.state.checkedList,this.state.formatIDs);
        settingsFromPage.barcodeformat = this.state.formatIDs;
    }

    render(){
        return(
            <Menu mode="inline">
                <SubMenu 
                    key="format"
                    title={
                        <span>
                            <Icon type="barcode"/>
                            <span>Barcode Format</span>
                        </span>    
                    }
                >
                    <div style={{ padding:"0 0 5px 25px" }}>
                        <Checkbox.Group
                        /*options={options}*/
                        value={this.state.checkedList}
                        onChange={this.onChange.bind(this)}>
                            <Row>
                                <Col span={12}>
                                    <Checkbox value="1D" format={_1D} onChange={this.onSelectFormat.bind(this)} >1D</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="PDF417" format={_PDF417} onChange={this.onSelectFormat.bind(this)}>PDF417</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="QR Code" format={_QRCODE} onChange={this.onSelectFormat.bind(this)}>QR Code</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Data Matrix" format={_DataMatrix} onChange={this.onSelectFormat.bind(this)}>Data Matrix</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="Aztec Code" format={_AztecCODE} onChange={this.onSelectFormat.bind(this)}>Aztec Code</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </div>
                    
                   {/*  <Menu.Item key="1D" style={{left:"5px"}}><h5>1D</h5></Menu.Item>
                    <Menu.Item key="PDF417" style={{left:"5px"}}><h5>PDF417</h5></Menu.Item>
                    <Menu.Item key="QR Code" style={{left:"5px"}}><h5>QR Code</h5></Menu.Item>
                    <Menu.Item key="Data Matrix" style={{left:"5px"}}><h5>Data Matrix</h5></Menu.Item>
                    <Menu.Item key="Actec Code" style={{left:"5px"}}><h5>Actec Code</h5></Menu.Item>*/}
                </SubMenu>    
                
            </Menu>
            
        )
    }
}


class ScanSettings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:"fast",
        }
    }


    onSelectChange = e =>{
        this.setState({
            value:e.target.value,
        });
    };

    componentDidUpdate(){
        console.log(this.state.value);
        settingsFromPage.localization=(this.state.value=="fast")?[2,0,0,0,0,0,0,0]:[2,16,4,8,0,0,0,0];
        settingsFromPage.deblurlevel = 0;
    }

    render(){
        return(
            <Menu mode="inline">
               <SubMenu
                    key="scan"
                    title={
                    <span>
                        <Icon type="setting"></Icon>
                        <span>Scan Settings</span>
                    </span>
                    }
                >
                    <Radio.Group style={{paddingLeft:'20px'}} onChange={this.onSelectChange.bind(this)} defaultValue='fast'>
                        <Radio style={AttributeStyle} value="fast">Fast</Radio>
                        <Radio style={AttributeStyle} value="accurate">Most Accurate</Radio>
                    </Radio.Group>
                    
                </SubMenu> 
            </Menu>
            
        )
    }
}

class ReadFullRegion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:0
        }
    }

    render(){
        return(
            <Menu mode="inline">
                <SubMenu 
                    key="region" 
                    title={
                    <span>
                        <Icon type="eye"></Icon>
                        <span>Read Full Region</span>
                    </span>
                    }
                >
                    <div>
                        <Switch onChange={this.onChangeRegionMode} 
                            style={{float:"right",right:"10px"}}/> 
                    </div>
                </SubMenu>   
            </Menu>
            
        )
    }
}


class About extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:0
        }
    }

    render(){
        return(
            <Menu mode="inline">
                <SubMenu
                    key="about"
                    title={
                    <span>
                        <Icon type="bulb"></Icon>
                        <span>About Dynamsoft</span>
                    </span>
                    }
                >
                    <div>
                        <Card title="About">
                            <p>
                            Founded in Sep 2003 with the aim of being the dynamic center of software developers, 
                            Dynamsoft provides enterprise-class document capture and image processing software development kits (SDK),
                            with numerous generations for each product. Today many Fortune 500 Companies including HP, IBM, Intel, and Siemens trust Dynamsoft solutions.
                            </p>
                        </Card>
                    </div>
                </SubMenu>
            </Menu>
        )
    }
}


class ClearCache extends React.Component{
    
    handleClear(){
        var config={};
        message.config({
            top:window.innerHeight/2,
            duration:2,
        });
        try{
            console.log(window.indexedDB);
            var request = window.indexedDB.deleteDatabase('dynamsoft');
            request.onsuccess = request.onerror = ()=>{
                if(request.error){
                    // alert('Clear failed: '+(request.error.message || request.error));
                    config.content='Clear failed: '+(request.error.message || request.error);
                    config.icon=<Icon type="close" style={{color:"red"}}></Icon>;
                    message.open(config);
                }else{
                    // alert('Clear success!');
                    config.content="Clear success!";
                    config.icon=<Icon type="check-circle" style={{color:"#FE8E14"}}></Icon>;
                    message.open(config);
                }
            };
        }catch(ex){
            //alert(ex.message || ex);
            config.content=ex.message || ex;
            config.icon=<Icon type="close" style={{color:"red"}}></Icon>;
            message.open(config);
        }
    }

    render(){
        return(
            <div className="clear-cache">
                <Button type="primary"
                 size="large" 
                 onClick={this.handleClear.bind(this)}
                 style={{backgroundColor:"rgb(254, 142, 20)",border:"1px solid rgb(254, 142, 20)"}}
                >
                    Clear Cache
                </Button>
            </div>
        )
    }
}

class SettingPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showMenu:true,
            //content:null,
            //resolutonValue: 1,
            //scanValue:0,
            selectedTags: [],
        }
    }

    componentDidMount(){
        
    }

    shouldComponentUpdate(nextProps,nextState){
        return false;
    }

    
    render(){
        return(
            <>
                {/* hide the setting button if the  setting page is shown */}
                {/* <div>
                    {
                        !this.state.showMenu && 
                        <div className="settingBtn-container">
                            <Icon onClick={this.onSettingClick.bind(this)}  type="setting" style={{fontSize:"50px",color:"wheat"}}></Icon>
                        </div>
                    }
                </div> */}
                
                {/* show the setting page */}
                
                {
                    //!this.state.showMenu ? null:
                    <div className="setting-container">
                        {/* <Link href="/"> */}
                            <div>
                            <PageHeader onBack={this.props.onBackClick/*()=>null*/} title="Settings"  />
                            </div>
                        {/* </Link> */}
                        <Menu
                            //defaultSelectedKeys={['video']}
                            //defaultOpenKeys={['Read Full Region']}
                            mode="inline"
                            theme="light"
                            
                        >
                            {/* Video Source */}
                            {/* <VideoSource></VideoSource>*/}
                            {/* <CutOff /> */}

                            {/* Video Resolution */}
                            <VideoResolution></VideoResolution>

                            <CutOff />

                            {/* //Barcode Format */}
                            <BarcodeFormat></BarcodeFormat>
                            
                            <CutOff />

                            {/* //Scan Settings */}
                            <ScanSettings></ScanSettings>

                            <CutOff />

                            {/* //Read Full Region */}
                            {/* <ReadFullRegion></ReadFullRegion> */}
                            {/* <CutOff /> */}

                            {/* About */}
                            <About></About>
                            
                            <CutOff />
                            {/* Clear Cache */}
                            <ClearCache></ClearCache>
                        </Menu>
                    </div>
                }
                
            </>
        );
    }
}



//将state数据注入到SettingPage组件中：
//export default connect(mapStateToProps)(SettingPage);
export default SettingPage;
export {settingsFromPage};