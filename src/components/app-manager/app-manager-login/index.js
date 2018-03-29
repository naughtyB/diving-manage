import React from 'react';
import { Form, Input, Icon, Button, Checkbox, message } from 'antd';
import { doChangeManagerLoginFields, doSubmitLogin, doChangeManagerLoginType } from '../../../redux/action/manager';
import { connect } from 'react-redux';
import './index.css';
const FormItem = Form.Item;

export class AppManagerLogin extends React.Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.props.onChangeManagerLoginFields({
      mobileNumber: {
        value: ''
      },
      password: {
        value: ''
      }
    })
  }
  handleSubmit(){
    this.props.form.validateFields(["mobileNumber","password"],(errors,values)=>{
      if(!errors && !this.props.isLogging){
        this.props.onSubmitLogin(values["mobileNumber"],values["password"], () => {
          message.info('登录成功')
        })
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="app-manager-login">
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
              <Input className="app-manager-login-mobileNumber" prefix={<Icon  type="mobile" style={{ fontSize: 13}} />} type="text" placeholder="手机号" />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            validateFirst:true,
          rules: [
            { required: true, message: '请输入密码' },
            { pattern:/[a-zA-Z0-9\-_]{4,30}/,message:"密码为4-30个字符,且不包含除_和-以外的字符"}
          ]
          })(
            <Input className="app-manager-login-password" prefix={<Icon type="lock" style={{ fontSize: 13}} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem style={{marginBottom: '10px'}}>
          {getFieldDecorator('autoLogin', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>自动登录</Checkbox>
          )}
          <span className="app-manager-login-forgetPassword" onClick={()=>this.props.onChangeManagerLoginType('resetPassword')}>忘记密码</span>
        </FormItem>
        <Button
          type="primary"
          htmlType="submit"
          className="app-manager-login-submit"
          loading={this.props.isLogging}
          onClick={this.handleSubmit}
        >
          登录
        </Button>
        <p><span className="app-manager-login-register" onClick={()=>this.props.onChangeManagerLoginType('register')}>注册新账号</span></p>
      </Form>  
    )
  }
}

const option = {
  onFieldsChange(props, changedFields) {
    props.onChangeManagerLoginFields(changedFields);
  },
  mapPropsToFields(props) {
    return {
      mobileNumber: Form.createFormField({
        ...props.loginFields.mobileNumber
      }),
      password: Form.createFormField({
        ...props.loginFields.password
      })
    };
  }
}

const mapStateToProps = (state) => {
  return {
    loginFields : state.manager.loginFields,
    isLogging : state.manager.isLogging
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onChangeManagerLoginFields: (fieldsChanged) => dispatch(doChangeManagerLoginFields(fieldsChanged)),
    onSubmitLogin: (mobileNumber, password) => dispatch(doSubmitLogin(mobileNumber, password)),
    onChangeManagerLoginType: (loginType) => dispatch(doChangeManagerLoginType(loginType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create(option)(AppManagerLogin));