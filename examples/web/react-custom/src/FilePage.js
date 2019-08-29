import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader} from 'antd';
import './FilePage.css';
import './Layout.css'


class FilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showFile:true,
        }
    }

    onAddFileClick(){
        this.setState({
            showFile:!this.state.showFile,
        })
        console.log(this.state.showFile);
    }
    render(){
        return(
            <>
                {/* hide the add button if the file page is shown */}
                {/* <div>
                    {
                        !this.state.showFile&&
                        <div className="selImgBtn-container">
                            <Icon onClick={this.onAddFileClick.bind(this)} type="plus" style={{fontSize:"50px",color:"wheat"}}></Icon>
                        </div>
                    }
                </div> */}
                
                {/* show the file page */}
                {
                    !this.state.showFile?null:
                    <div className="file-container">
                        <PageHeader onBack={this.props.onBackClick} title="Files"  />
                    </div>
                }
            </>
            
        )
    }
}
export default FilePage;