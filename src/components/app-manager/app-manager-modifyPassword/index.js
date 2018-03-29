import React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { doChangeManagerResetPasswordFields, doSubmitResetPassword, doChangeManagerLoginType } from '../../../redux/action/manager.js';
import './index.css';
const FormItem = Form.Item; 

export class AppHeaderUserResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  componentWillMount(){
    this.props.onChangeManagerResetPasswordFields({
      mobileNumber:{
        value: ''
      },
      password: {
        value: ''
      },
      confirm: {
        value: ''
      },
      captcha: {
        value: ''
      }
    })
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入必须一致');
    } else {
      callback();
    }
  }
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    const repeatPassword = form.getFieldValue('confirm');
    if(repeatPassword){
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleSubmit(){
    this.props.form.validateFields(["mobileNumber", "password", "confirm" , "captcha"],(errors,values)=>{
      if(!errors && !this.props.isResettingPassword){
        this.props.onSubmitResetPassword(values["mobileNumber"], values["password"], values["captcha"], () => {
          message.info('重置密码成功并已自动登录')
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="app-manager-reset-password">
        <FormItem hasFeedback>
          {getFieldDecorator('mobileNumber', {
            validateFirst: true,
            rules: [
              { required: true, message: '请输入手机号!'},
              { pattern:/^\S+$/,message:"手机号不能包含空格"},
              { pattern:/^\d+$/,message:"请输入正确的手机号"},
              { len:11,message:"请输入11位数字的手机号"}
            ]
            })(
                <Input style={{height: '40px'}} prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} type="text" placeholder="手机号" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            validateFirst: true,
            rules: [
              { required: true, message: '请输入密码' },
              { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"密码为4-30个字符,且不包含除_和-以外的字符"},
              { validator: this.checkConfirm }
            ]
            })(
              <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('confirm', {
            validateFirst: true,
            rules: [
              { required: true, message: '请再次输入密码' },
              { validator: this.checkPassword }
            ]
            })(
              <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="请再次输入密码" />
          )}
        </FormItem>
        <FormItem>
          <div className="app-manager-reset-password-captcha">
            {getFieldDecorator('captcha', {
              validateFirst: true,
              rules: [{ required: true, message: '请输入验证码' }]
              })(
                <Input
                  style={{height: '40px'}}
                  className="app-header-user-reset-password-captcha-input"
                  prefix={<Icon type="captcha" style={{ fontSize: 13}} />}
                  placeholder="验证码"
                />
            )}
            <Button
              style={{height: '40px'}}
              className="app-header-user-reset-password-captcha-button"
              onClick={()=>{message.info("暂时没钱买这个功能，测试验证码为5257")}}
            >
              获取验证码
            </Button>
          </div>
        </FormItem>                    
        <div>
          <Button
            type="primary"
            htmlType="submit"
            className="app-manager-reset-password-submit-input"
            loading={this.props.isResettingPassword}
            onClick={this.handleSubmit}
          >
            确认修改
          </Button>
          <span className="app-manager-reset-password-hadMobileNumber" onClick={()=>this.props.onChangeManagerLoginType('login')}>已有帐号，登录</span>
        </div>
      </Form>
    )     
  }
}

const options = {
  onFieldsChange(props, changedFields) {
    props.onChangeManagerResetPasswordFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      mobileNumber: Form.createFormField({
        ...props.resetPasswordFields.mobileNumber
      }),
      password: Form.createFormField({
        ...props.resetPasswordFields.password
      }),
      confirm: Form.createFormField({
        ...props.resetPasswordFields.confirm
      }),
      captcha: Form.createFormField({
        ...props.resetPasswordFields.captcha
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    isResettingPassword: state.manager.isResettingPassword,
    resetPasswordFields: state.manager.resetPasswordFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeManagerResetPasswordFields: (resetPasswordFieldsChanged) => dispatch(doChangeManagerResetPasswordFields(resetPasswordFieldsChanged)),
    onSubmitResetPassword: (mobileNumber, password, captcha, successCallback) => dispatch(doSubmitResetPassword(mobileNumber, password, captcha, successCallback)),
    onChangeManagerLoginType: (loginType) => dispatch(doChangeManagerLoginType(loginType))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Form.create(options)(AppHeaderUserResetPassword));