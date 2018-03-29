import React from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';
import { doChangeManagerRegisterFields, doSubmitRegister, doChangeManagerLoginType } from '../../../redux/action/manager';
import './index.css';
const FormItem = Form.Item;

export class AppManagerRegister extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
  }
  componentWillMount(){
    this.props.onChangeManagerRegisterFields({
      mobileNumber: {
        value: ''
      },
      password: {
        value: ''
      },
      confirm: {
        value: ''
      },
      username: {
        value: ''
      },
      captcha: {
        value: ''
      }
    })
  }
  checkConfirm(rule, value, callback){
    const form = this.props.form;
    const repeatPassword = form.getFieldValue('confirm');
    if(repeatPassword){
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  checkPassword(rule, value, callback){
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入必须一致');
    } else {
      callback();
    }
  }
  handleSubmit(){
    this.props.form.validateFields(["mobileNumber", "password", "confirm" ,"username", "captcha"],(errors,values)=>{
      if(!errors && !this.props.isRegistering){
        this.props.onSubmitRegister(values["mobileNumber"], values["password"], values["username"], values["captcha"], () => {
          message.info('注册成功并已自动登录')
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="app-manager-register">
        <FormItem hasFeedback>
          {getFieldDecorator('mobileNumber', {
            validateFirst:true,
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
            validateFirst:true,
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
            validateFirst:true,
          rules: [
            { required: true, message: '请再次输入密码' },
            { validator: this.checkPassword }
          ]
          })(
            <Input style={{height: '40px'}} prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="请再次输入密码" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            validateFirst:true,
            rules: [
                { required: true, message: '请输入昵称' },
                { pattern:/[\u4e00-\u9fa5a-zA-Z0-9\-_]{4,30}/,message:"昵称为4-30个字,且不包含出_和-以外的字符"}
            ]
          })(
            <Input style={{height: '40px'}} className="app-manager-register-username-input" prefix={<Icon type="user" style={{ fontSize: 13}} />} type="username" placeholder="昵称" />
          )}
        </FormItem>
        <FormItem>
          <div className="app-manager-register-captcha">
            {getFieldDecorator('captcha', {
                validateFirst:true,
                rules: [{ required: true, message: '请输入验证码' }]
            })(
                <Input
                    style={{height: '40px'}}
                    className="app-manager-register-captcha-input"
                    prefix={<Icon type="captcha" style={{ fontSize: 13}} />}
                    placeholder="验证码"
                />
            )}
            <Button
              style={{height: '40px'}}
              className="app-manager-register-captcha-button"
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
            className="app-manager-register-submit-input"
            loading={this.props.isRegistering}
            onClick={this.handleSubmit}
          >
            注册
          </Button>
          <span className="app-manager-register-hadMobileNumber" onClick={()=>this.props.onChangeManagerLoginType('login')}>已有帐号，登录</span>
        </div>
      </Form>               
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeManagerRegisterFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      mobileNumber: Form.createFormField({
        ...props.registerFields.mobileNumber
      }),
      password: Form.createFormField({
        ...props.registerFields.password
      }),
      confirm: Form.createFormField({
        ...props.registerFields.confirm
      }),
      username: Form.createFormField({
        ...props.registerFields.username
      }),
      captcha: Form.createFormField({
        ...props.registerFields.captcha
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    isRegistering: state.manager.isRegistering,
    registerFields: state.manager.registerFields
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeManagerRegisterFields: (registerFieldsChanged) => dispatch(doChangeManagerRegisterFields(registerFieldsChanged)),
    onSubmitRegister: (mobileNumber, password, username, captcha, successCallback) => dispatch(doSubmitRegister(mobileNumber, password, username, captcha, successCallback)),
    onChangeManagerLoginType: (loginType) => dispatch(doChangeManagerLoginType(loginType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(AppManagerRegister));

