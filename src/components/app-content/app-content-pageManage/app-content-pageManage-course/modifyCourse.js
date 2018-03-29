import React from 'react';
import { Form, Input, Alert, Button, message, Spin } from 'antd';
import { doChangeCourseFields, doCreateCourse, doChangeCourseDetail, doGetCourseDetailData, doModifyCourse } from '../../../../redux/action/course.js';
import { doChangeManagerLoginState } from '../../../../redux/action/manager.js';
import { connect } from 'react-redux';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    sm: { span: 7 }
  },
  wrapperCol: {
    sm: { span: 17 }
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

export class modifyCourse extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contentId: new Date().getTime()
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }
  componentWillMount(){
    let hash = transformHash(this.props.location.hash);
    if(hash.type === 'add'){
      this.props.onChangeCourseDetail('');
    }
    else if(hash.type === 'modify' && hash.courseId.length === 24){
      this.props.onGetCourseDetailData(hash.courseId, () => {
        this.props.history.push({
          pathname: '/pageManage/course'
        })
      })
    }
    else{
      this.props.history.push({
        pathname: '/pageManage/course'
      })
    }
  }
  componentWillUpdate(nextProps){
    if(this.props.isGettingCourseDetailData !== nextProps.isGettingCourseDetailData && !nextProps.isGettingCourseDetailData){
      this.setState({
        contentId: new Date().getTime()
      })
    }
  }
  handleChange(content){
    this.props.onChangeCourseDetail(content);
  }
  handleBack(){
    this.props.history.push({
      pathname: '/pageManage/course'
    })
  }
  handleSubmit(){
    this.props.form.validateFields(["courseName"],(errors,values)=>{
      if(!errors && !this.props.isCreatingCourse && !this.props.isModifyingCourse){
        let hash = transformHash(this.props.location.hash);
        if(hash['type'] === 'add'){
          this.props.onCreateCourse(values['courseName'],((this.props.courseDetail === '<p></p>' || !this.props.courseDetail) ? '' : this.props.courseDetail), () => {
            message.info('创建潜水课程成功');
            this.props.history.push({
              pathname: '/pageManage/course'
            })
          }, () => {
            this.props.onChangeManagerLoginState(false, {});
            message.info('请先登录');
          })
        }
        else if(hash['type'] === 'modify'){
          this.props.onModifyCourse(hash['courseId'], values['courseName'],((this.props.courseDetail === '<p></p>' || !this.props.courseDetail) ? '' : this.props.courseDetail), () => {
            message.info('编辑潜水课程成功');
            this.props.history.push({
              pathname: '/pageManage/course'
            })
          }, () => {
            this.props.onChangeManagerLoginState(false, {});
            message.info('请先登录');
          })
        }
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const courseDetailData = this.props.courseDetailData;
    const hash = transformHash(this.props.location.hash);
    const editorProps = {
      height: 500,
      contentId: this.state.contentId,
      contentFormat: 'html',
      initialContent: hash['type'] === 'add' ? '' : (hash['type'] === 'modify' ? courseDetailData.detail : ''),
      onChange: this.handleChange,
      media: {
        video: false,
        audio: false,
        uploadFn(param){
          const serverURL = '/upload'
          const xhr = new XMLHttpRequest()
          const fd = new FormData()
        
          // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
          console.log(param.libraryId)
        
          const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            param.success({
              url: JSON.parse(xhr.responseText)['url']
            })
          }
        
          const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
          }
        
          const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
              msg: 'unable to upload.'
            })
          }
        
          xhr.upload.addEventListener("progress", progressFn, false)
          xhr.addEventListener("load", successFn, false)
          xhr.addEventListener("error", errorFn, false)
          xhr.addEventListener("abort", errorFn, false)
        
          fd.append('file', param.file)
          xhr.open('POST', serverURL, true)
          xhr.send(fd)
        
        }
      }
    }
    return (
      <Spin spinning={this.props.isGettingCourseDetailData}>
        <Form>
          <FormItem
              style={{width: '400px'}}
              {...formItemLayout} 
              label='潜水课程名称'
            >
              {getFieldDecorator('courseName', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入潜水课程名称' }
                ]
                })(
                    <Input type="text"/>
              )}
          </FormItem>
          <Alert 
            style={{marginBottom: '10px'}} 
            message={
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{lineHeight: '32px'}}>潜水课程详情在下面编辑器进行编辑</span>
                <span>
                  <Button type="primary" style={{marginRight: '15px'}} onClick={this.handleSubmit} loading={this.props.isCreatingCourse || this.props.isModifyingCourse}>确认</Button>
                  <Button type="primary" onClick={this.handleBack}>返回</Button>
                </span>
              </div>
            } 
            type="info" 
          />
          <div className="demo">
            <BraftEditor {...editorProps}/>
          </div>
        </Form>
      </Spin>
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeCourseFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      courseName: Form.createFormField({
        ...props.courseFields.courseName
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    courseFields: state.course.courseFields,
    courseDetail: state.course.courseDetail,
    isCreatingCourse: state.course.isCreatingCourse,
    isGettingCourseDetailData: state.course.isGettingCourseDetailData,
    courseDetailData: state.course.courseDetailData,
    isModifyingCourse: state.course.isModifyingCourse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeCourseFields: (fieldsChanged) => dispatch(doChangeCourseFields(fieldsChanged)),
    onCreateCourse: (courseName, courseDetail, successCallback, notLoggedCallback) => dispatch(doCreateCourse(courseName, courseDetail, successCallback, notLoggedCallback)),
    onChangeCourseDetail: (courseDetail) => dispatch(doChangeCourseDetail(courseDetail)),
    onChangeManagerLoginState: (loginState, managerData) => dispatch(doChangeManagerLoginState(loginState, managerData)),
    onGetCourseDetailData: (courseId, errCallback) => dispatch(doGetCourseDetailData(courseId, errCallback)),
    onModifyCourse: (courseId, courseName, courseDetail, successCallback, notLoggedCallback) => dispatch(doModifyCourse(courseId, courseName, courseDetail, successCallback, notLoggedCallback))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(modifyCourse));