import React from 'react';
import { Upload, Button, Icon, Spin, Tooltip, Modal, Input } from 'antd';
import { doGetHomepageData, doChangeHomepageData, doChangeModalVisible, doChangeLinkInputValue, doAddBannerLink, doDeleteBanner } from '../../../../redux/action/homepage.js';
import { connect } from 'react-redux';
import './index.css';


export class AppContentPageManageHomepage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fileList: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentWillMount(){
    this.props.onGetHomepageData((homepageData) => {
      if(homepageData && homepageData.banner && homepageData.banner.length > 0){
        this.setState({
          fileList: homepageData.banner.map((item, index) => {
            return {
              uid: item['_id'],
              name: (
                <Tooltip placement="topLeft" title={item.link ? '链接：' + item.link : '链接未编辑---请点击并编辑'}>
                  {item.url.replace(/[\S\s]+\/([^\/]+?)/, '$1')}
                </Tooltip>
              ),
              status: 'done',
              url: item.url,
              link: item.link
            }
          })
        })
      }
    });
  }
  componentWillUpdate(nextProps){
    if(this.props.homepageData !== nextProps.homepageData && nextProps.homepageData){
      if(nextProps.homepageData.banner && nextProps.homepageData.banner.length > 0){
        this.setState({
          fileList: nextProps.homepageData.banner.map((item, index) => {
            return {
              uid: item['_id'],
              name: (
                <Tooltip placement="topLeft" title={item.link ? '链接:' + item.link : '链接未编辑  请点击并编辑'}>
                  {item.url.replace(/[\S\s]+\/([^\/]+?)/, '$1')}
                </Tooltip>
              ),
              status: 'done',
              url: item.url,
              link: item.link
            }
          })
        })
      }
    }
  }
  handlePreview(file){
    console.log(file.link)
    this.props.onChangeModalVisible(true, file.url, file.link ? file.link.replace(/http:\/\/localhost:8000\/([\s\S]+)/, '$1') : '');
  }
  handleChange(info){
    if(info.file.response && info.file.response.homepageData){
      this.props.onChangeHomepageData(info.file.response.homepageData)
    }
    else{
      this.setState({
        fileList: info.fileList
      })
    }
  }
  handleAddLink(){
    this.props.onAddBannerLink(this.props.homepageData['_id'], this.props.currentUrl, 'http://localhost:8000/' + this.props.linkInputValue)
  }
  handleCancel(){
    this.props.onChangeModalVisible(false, '');
  }
  handleInputChange(e){
    this.props.onChangeLinkInputValue(e.target.value)
  }
  handleRemove(file){
    console.log(this.props.homepageData['_id']);
    console.log(file.url)
    this.props.onDeleteBanner(this.props.homepageData['_id'], file.url)
  }
  render(){
    let { isGettingHomepageData, homepageData, isDeletingBanner } = this.props;
    return (
      <Spin spinning={isGettingHomepageData || isDeletingBanner}>
        <div className="app-scrollbar" style={{padding: '24px', margin: '24px 16px', backgroundColor: '#fff'}}>
          <Upload 
            action="/uploadHomepage"
            listType="picture"
            data={{homepageId: homepageData ? homepageData['_id'] : ''}}
            className="upload-list-inline"
            fileList={this.state.fileList}
            onChange={this.handleChange}
            onPreview={this.handlePreview}
            onRemove={this.handleRemove}
          >
            <Button>
              <Icon type="upload" /> 上传banner
            </Button>
          </Upload>
          <Modal
            title="添加链接"
            visible={this.props.modalVisible}
            onCancel={this.handleCancel}
            onOk={this.handleAddLink}
            confirmLoading={this.props.isAddingBannerLink}
          >
            <Input addonBefore="http://localhost:8000/" onChange={this.handleInputChange} value={this.props.linkInputValue}/>
          </Modal>
        </div>
      </Spin>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    homepageData: state.homepage.data,
    isGettingHomepageData: state.homepage.isGettingHomepageData,
    modalVisible: state.homepage.modalVisible,
    currentUrl: state.homepage.currentUrl,
    linkInputValue: state.homepage.linkInputValue,
    isAddingBannerLink: state.homepage.isAddingBannerLink,
    isDeletingBanner: state.homepage.isDeletingBanner
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetHomepageData: (successCallback) => dispatch(doGetHomepageData(successCallback)),
    onChangeHomepageData: (homepageData) => dispatch(doChangeHomepageData(homepageData)),
    onChangeModalVisible: (modalVisible, currentUrl, linkInputValue) => dispatch(doChangeModalVisible(modalVisible, currentUrl, linkInputValue)),
    onChangeLinkInputValue: (linkInputValue) => dispatch(doChangeLinkInputValue(linkInputValue)),
    onAddBannerLink: (homepageId, url, link) => dispatch(doAddBannerLink(homepageId, url ,link)),
    onDeleteBanner: (homepageId, url) => dispatch(doDeleteBanner(homepageId, url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContentPageManageHomepage);