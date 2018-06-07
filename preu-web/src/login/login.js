import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './login.css';
import AuthService from '../services/auth';


const FormItem = Form.Item;
const Auth = new AuthService();
class LoginForm extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err){
        Auth.login(this.props.form.getFieldValue('rut'), this.props.form.getFieldValue('password'))
        .then(res => {
          this.props.history.replace('/');
        })
      }
    });
  }
  componentWillMount(){
    if(this.Auth.loggedIn())
      this.props.history.replace('/');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={ this.handleSubmit } className="login-form">
          <FormItem>
            { getFieldDecorator('rut', {
              rules: [{ required: true, message: 'Please input your rut'}],
            })(
              <Input prefix={<Icon type="user" style= {{ color: 'rgba(0,0,0,.25)'}} />} placeholder="12345678-9" />
            )}
          </FormItem>
          <FormItem>
            { getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password'}],
            })(
              <Input prefix={<Icon type="lock" style= {{ color: 'rgba(0,0,0,.25)'}} /> } type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;
