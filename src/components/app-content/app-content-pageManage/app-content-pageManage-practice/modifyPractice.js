import React from 'react';
import { Form, Button, Input, Upload, Icon, message } from 'antd';
import { doChangePracticeFields, doCreatePractice } from '../../../../redux/action/practice.js';
import { doChangeManagerLoginState } from '../../../../redux/action/manager.js';
import { connect } from 'react-redux';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    sm: { span: 4, offset:4 }
  },
  wrapperCol: {
    sm: { span: 16 }
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    sm: { span: 16, offset: 8 }
  },
};

let transformHash = (hash) => {
  let hashData={};
  hash.slice(1).split("&").forEach((item,index)=>{
      let arr=item.split("=");
      hashData[arr[0]]=decodeURIComponent(arr[1]);
  });
  return hashData;
};

class PracticeDetail extends React.Component{
  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      title: value.title || '',
      detail: value.detail || '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDetailChange = this.handleDetailChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  handleTitleChange(e){
    const title = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ title });
    }
    this.triggerChange({ title });
  }
  handleDetailChange(e){
    const detail = e.target.value;
    if (!('value' in this.props)) {
      this.setState({ detail });
    }
    this.triggerChange({ detail });
  }
  triggerChange(changedValue){
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }
  render(){
    return (
      <span>
        <Input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="请输入标题"
          style={{ width: '35%', marginRight: '3%' }}
        />
        <Input
          type="text"
          value={this.state.detail}
          onChange={this.handleDetailChange}
          placeholder="请输入内容"
          style={{ width: '35%', marginRight: '3%' }}
        />
      </span>
    )
  }
}

export class ModifyPractice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      uploadStyle: {
        backgroundImage: '',
        backgroundSize: '100% 100%'
      },
      opacity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleMouseEnterFile = this.handleMouseEnterFile.bind(this);
    this.handleMouseLeaveFile = this.handleMouseLeaveFile.bind(this);
    this.normFile = this.normFile.bind(this);
    this.addPracticeDetail = this.addPracticeDetail.bind(this);
    this.removePracticeDetail = this.removePracticeDetail.bind(this);
  }
  componentWillMount(){
    let hash = transformHash(this.props.location.hash);
    if(hash.type === 'add'){
      this.props.onChangePracticeFields({
        practiceName: {
          value: ''
        },
        practicePrice: {
          value: ''
        },
        practiceImgUrl: {
          value: []
        },
        keys: {
          value: [0]
        },
        practiceIntroduction0: {
          value: {
            title: '',
            detail: ''
          }
        }
      })
    }
    else{
      this.props.history.push({
        pathname: '/pageManage/course'
      })
    }
  }
  addPracticeDetail(){
    let keys = this.props.form.getFieldValue('keys');
    this.props.onChangePracticeFields({
      keys: {
        value: keys.concat(keys[keys.length - 1] + 1)
      },
      ["practiceIntroduction" + (keys[keys.length - 1] + 1)] : {
        value: {
          title: '',
          detail: ''
        }
      }
    })
  }
  removePracticeDetail(practiceDetailIndex){
    this.props.onChangePracticeFields({
      keys: {
        value: this.props.form.getFieldValue('keys').filter((item, index) => {
          return index !== practiceDetailIndex
        })
      }
    })
  }
  handleSubmit(){
    let practiceIntroductionArr = this.props.form.getFieldValue('keys').map((item, index) => {
      return `practiceIntroduction${item}`;
    })
    this.props.form.validateFields(['practiceName', 'practicePrice', 'practiceImgUrl', 'keys', ...practiceIntroductionArr], (errors, values) => {
      if(!errors && !this.props.isCreatingPractice){
        let hash = transformHash(this.props.location.hash);
        if(hash['type'] === 'add'){
          let fileList = this.props.form.getFieldValue('practiceImgUrl');
          let practiceData = {
            practiceName: values['practiceName'],
            practicePrice: values['practicePrice'],
            practiceImgUrl: fileList[fileList.length - 1]['response']['url'],
            practiceDetail: this.props.form.getFieldValue('keys').map((item, index) => {
              let data = this.props.form.getFieldValue(`practiceIntroduction${item}`);
              return {
                title: data.title,
                content: data.detail
              }
            })
          }
          this.props.onCreatePractice(JSON.stringify(practiceData), () => {
            message.info('创建潜水练习成功');
            this.props.history.push({
              pathname: '/pageManage/practice'
            })
          }, () => {
            this.props.onChangeManagerLoginState(false, {});
            message.info('请先登录');
          })
        }
      }
    })
  }
  handleFileChange(info){
    if(info.file.response && info.file.response.url){
      this.setState({
        uploadStyle: {
          backgroundImage: `url(${info.file.response.url})`,
          backgroundSize: '100% 100%'
        },
        opacity: 0
      })
    }
  }
  handleMouseEnterFile(){
    this.setState({
      opacity: 1
    })
  }
  handleMouseLeaveFile(){
    if(this.state.uploadStyle.backgroundImage){
      this.setState({
        opacity: 0
      })
    }
  }
  normFile(e){
    return e.fileList ? e.fileList : [];
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator('keys');
    const keys = this.props.form.getFieldValue('keys');
    return (
      <div className="app-content-pageManage-modifyPractice-list app-scrollbar">
        <div className="brief-introduction">
          <div className="brief-introduction-left">
            <h2 className="brief-introduction-left-title">潜水练习资料修改</h2>
            <p>请在下方填入潜水练习的相关资料</p>
          </div>
          <div className="brief-introduction-right">
            <img className="brief-introduction-right-img" src="http://localhost:8000/public/image/practice/RzwpdLnhmvDJToTdfDPe.png" alt=""/>
          </div>
        </div>
        <div className="form-field">
          <Form>
            <FormItem
              {...formItemLayout} 
              label='潜水练习场馆名称'
            >
              {getFieldDecorator('practiceName', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入潜水练习场馆名称' }
                ]
              })(
                <Input type="text" style={{width: '486px'}}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout} 
              label='潜水练习价格'
            >
              {getFieldDecorator('practicePrice', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入潜水练习价格' }
                ]
              })(
                <Input type="text" style={{width: '486px'}}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout} 
              label='上传潜水场馆照片'
            >
              <div className="dropbox">
                {getFieldDecorator('practiceImgUrl', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [{
                    validator: (rule, value, callback) => {
                      if(value.length === 0){
                        callback('请选择图片')
                      }
                      callback()
                    }
                  }]
                })(
                  <Upload.Dragger 
                    name="file" 
                    action="/upload"
                    showUploadList={false}
                    onChange={this.handleFileChange}
                    style={this.state.uploadStyle}
                  >
                    <div className="upload-content" style={{opacity: this.state.opacity, padding: '30px 0'}} onMouseEnter={this.handleMouseEnterFile} onMouseLeave={this.handleMouseLeaveFile}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox"/>
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </div>
                  </Upload.Dragger>
                )}
              </div>
            </FormItem>
            {
              keys.map((item, index) => {
                return (
                  <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '潜水练习介绍' : ''}
                    key={item}
                  >
                    {getFieldDecorator(`practiceIntroduction${item}`, {
                      validateFirst: true
                    })(
                      <PracticeDetail />
                    )}
                    {keys.length > 1 ? (
                      <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.removePracticeDetail(index)}
                      />
                    ) : null}
                  </FormItem>
                )
              })
            }
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.addPracticeDetail} style={{ width: '250px' }}>
                <Icon type="plus" /> 增加潜水练习介绍
              </Button>
            </FormItem>
            <FormItem
              {...formItemLayoutWithOutLabel}
            >
              <div>
                <Button type="primary" onClick={this.handleSubmit} loading={this.props.isCreatingPractice}>
                  提交
                </Button>
                <Button type="primary" style={{marginLeft: '15px'}}>
                  返回
                </Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangePracticeFields(changedFields);
  },
  mapPropsToFields(props) {
    let practiceIntroduction = {};
    props.practiceFields.keys.value.forEach((item, index) => {
      practiceIntroduction[`practiceIntroduction${item}`] = Form.createFormField({
        ...(props.practiceFields[`practiceIntroduction${item}`] ? props.practiceFields[`practiceIntroduction${item}`] : {value: {title: '', detail: ''}})
      })
    })
    console.log(practiceIntroduction)
    return {
      practiceName: Form.createFormField({
        ...props.practiceFields.practiceName
      }),
      practicePrice: Form.createFormField({
        ...props.practiceFields.practicePrice
      }),
      practiceImgUrl: Form.createFormField({
        ...props.practiceFields.practiceImgUrl
      }),
      keys: Form.createFormField({
        ...props.practiceFields.keys
      }),
      ...practiceIntroduction
    };
  }
}

const mapStateToProps = (state) => {
  return {
    isCreatingPractice: state.practice.isCreatingPractice,
    practiceFields: state.practice.practiceFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangePracticeFields: (fieldsChanged) => dispatch(doChangePracticeFields(fieldsChanged)),
    onCreatePractice: (practiceData, successCallback, notLoggedCallback) => dispatch(doCreatePractice(practiceData, successCallback, notLoggedCallback)),
    onChangeManagerLoginState: (loginState, managerData) => dispatch(doChangeManagerLoginState(loginState, managerData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(ModifyPractice));