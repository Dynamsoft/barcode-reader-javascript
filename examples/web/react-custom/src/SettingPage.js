import React from 'react';
import 'antd/dist/antd.css'
import { PageHeader,Menu, Icon, Button,Radio, Card,Switch,Divider } from 'antd';
import './SettingPage.css';
import './Layout.css'

const { SubMenu } = Menu;

function CutOff(){
    return(
        <Divider style={{margin:"10px 0"}}/>
    )
}

const AttributeStyle = {
    padding:"5px"
};

class SettingPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showMenu:true,
            content:null,
            collapsed: false,
            value: 1,
            selectedTags: [],
        }
    }


    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    onResolutionChange = e =>{
        this.setState({
            value:e.target.value,
        });
    };

    onScanSettinfChange = e =>{
        this.setState({
            value:e.target.value,
        });
    };

    onSettingClick(){
        this.setState({
            showMenu:!this.state.showMenu,
        });
        //console.log(this.state.showMenu);
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
                    !this.state.showMenu ? null:
                    <div className="setting-container">
                        <PageHeader onBack={this.props.onBackClick} title="Settings"  />
                        <Menu
                            //defaultSelectedKeys={['video']}
                            //defaultOpenKeys={['Read Full Region']}
                            mode="inline"
                            theme="light"
                            inlineCollapsed={this.state.collapsed}
                            
                        >
                            {/* Video Source */}
                            <SubMenu
                                key="video"
                                title={
                                <span>
                                    <Icon type="camera" />
                                    <span>Video Source</span>
                                </span>
                                }
                            >
                                <Menu.Item key="camera1">Camera 1</Menu.Item>
                                <Menu.Item key="camera2">Camera 2</Menu.Item>
                            </SubMenu>

                            <CutOff />

                            {/* Video Resolution */}
                            <SubMenu
                                key="resolution"
                                title={
                                <span>
                                    <Icon type="eye"/>
                                    <span>Video Resolution</span>
                                </span>
                                }
                            >
                                <Radio.Group style={{paddingLeft:'20px'}} onChange={this.onResolutionChange} value={this.state.value}>
                                    <Radio style={AttributeStyle} value={1}>3080*2160</Radio>
                                    <Radio style={AttributeStyle} value={2}>2560*1440</Radio>
                                    <Radio style={AttributeStyle} value={3}>1929*1080</Radio>
                                    <Radio style={AttributeStyle} value={4}>1600*1200</Radio>
                                    <Radio style={AttributeStyle} value={5}>1280*720</Radio>
                                    <Radio style={AttributeStyle} value={6}>800*600</Radio>
                                    <Radio style={AttributeStyle} value={7}>640*480</Radio>
                                    <Radio style={AttributeStyle} value={8}>640*360</Radio>
                                </Radio.Group>
                            </SubMenu>

                            <CutOff />

                            {/* //Barcode Format */}
                            <Menu.ItemGroup key="Barcode Format" title="Barcode Format" icon="barcode">
                                <Menu.Item key="1D" style={{left:"5px"}}><h5>1D</h5></Menu.Item>
                                <Menu.Item key="PDF417" style={{left:"5px"}}><h5>PDF417</h5></Menu.Item>
                                <Menu.Item key="QR Code" style={{left:"5px"}}><h5>QR Code</h5></Menu.Item>
                                <Menu.Item key="Data Matrix" style={{left:"5px"}}><h5>Data Matrix</h5></Menu.Item>
                                <Menu.Item key="Actec Code" style={{left:"5px"}}><h5>Actec Code</h5></Menu.Item>
                            </Menu.ItemGroup>
                            
                            <CutOff />

                            {/* //Scan Settings */}
                            <SubMenu
                                key="scan"
                                title={
                                <span>
                                    <Icon type="setting"></Icon>
                                    <span>Scan Settings</span>
                                </span>
                                }
                            >
                                <Radio.Group style={{paddingLeft:'20px'}} onChange={this.onScanSettinfChange} value={this.state.value}>
                                    <Radio style={AttributeStyle} value="Fast">Fast</Radio>
                                    <Radio style={AttributeStyle} value="Most Accurate">Most Accurate</Radio>
                                </Radio.Group>
                                
                            </SubMenu>

                            <CutOff />

                            {/* //Read Full Region */}
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
                            
                            <CutOff />

                            {/* About */}
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
                            
                            <CutOff />
                            {/* Clear Cache */}
                            <div className="clear-cache">
                                <Button type="primary" size="large" onClick={()=>null}>
                                    Clear Cache
                                </Button>
                            </div>
                        </Menu>
                    </div>
                }
                
            </>
        );
    }
}


export default SettingPage;