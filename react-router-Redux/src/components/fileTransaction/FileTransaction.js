import React from 'react';
import {downloadFileService, listFileService, uploadService} from "../../api/fileTransaction";
import MainContent from "../mainContent/MainContent";
import {connect} from "react-redux";
import './fileTransaction.css';
import {setListFileAction,uploadFileAction} from "../../actions/fileTransaction";


class FileTransaction extends React.Component {
    state= {loading: false,alert: 'fileTransaction hideAlert',notificationMessage: ''};

    componentDidMount(){
        this.onGetListFile();
    }

    doTutup = (e) => {
        e.preventDefault();
        this.props.history.push({
            pathname : '/protected/main'
        })
    }

    onChangeHandler = async (event) => {
        this.props.uploadFileAction(event.target.files[0])
    }

    onClickHandler = async (event) => {
        console.log(this.props.uploadFile.name)
        if(this.props.uploadFile.name){
            this.setState({alert: 'fileTransaction hideAlert',notificationMessage: ''})
            const data = new FormData();           
            data.append('documentFile', this.props.uploadFile);
            const response = await uploadService(data);
            const d = await response.json();
            console.log(d)
            if(d.status !== 'OK'){
                this.setState({alert: '', notificationMessage: 'Internal Server Error'})
            }

            this.onGetListFile()


        }else{
            this.setState({alert: '', notificationMessage: 'Select File First'})
        }
    }

    onGetListFile = async () => {
        this.setState({loading:true});
        try{
            const response = await listFileService();
            const data = await response.json();
            this.props.setListFileAction(data);

        } catch (err) {
            this.setState({alert: true, notificationMessage: 'Session timeout'});
            setTimeout(() => {
                this.props.history.replace({pathname: '/'});
            }, 15000)
        }
        this.setState({loading:false})
    }

    onDownload = async (nama) => {
        const response = await downloadFileService(nama);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([blob]));
        link.setAttribute('download',nama);
        document.body.appendChild(link);
        link.click();
        link.remove();
        this.setState({message: 'Download ok'});
    }
    
    onRenderListFile = () => {
        return this.props.listFile.map((file, index) => {
            return (
                <tr key={index}>
                <td>{file.namaFile}</td>
                <td>
                    <button type='button' className='btn btn-primary'
                    onClick={() => this.onDownload(file.namaFile)}>
                        Download
                    </button>
                </td>
                </tr>
            )
        })
    }

    render() {
        const {loading,alert,notificationMessage} = this.state;

        return(
            <MainContent {...this.props}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <div className='d-flex flex-row align-items-center'>
                                <div className='flex-grow-1'><i className="fas fa-cloud-upload-alt"></i>Upload</div>
                                <div>
                                <button className="btn btn-link" onClick={this.doTutup}><i
                            className="fas fa-2x fa-times-circle"></i></button>
                                </div>
                            </div>
                        </h5>
                        <div className={`alert alert-danger ${alert}`} role="alert">
                            {notificationMessage}
                        </div>
                        <input type="file" name="file" onChange={this.onChangeHandler}/>
                        <button type="button" className="btn btn-primary" onClick={this.onClickHandler}>Upload</button>
                    </div>
                </div>
                <div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td>Nama File</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.onRenderListFile()}
                        </tbody>
                    </table>
                </div>
            </MainContent>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listFile: state.listFile,
        uploadFile: state.uploadFile
    };
};

const mapDispatchToProps = {
    setListFileAction: setListFileAction,
    uploadFileAction: uploadFileAction
};

export default connect(mapStateToProps, mapDispatchToProps)(FileTransaction);