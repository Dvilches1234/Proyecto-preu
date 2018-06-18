import React, { Component } from 'react';
import {Form, Input, Button, message, Card, Row, Col, Layout } from 'antd';
import './Login.css';
import APIService from './../../lib/APIService';
import logo from './../logo.svg';
const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;
class LoginForm extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.APIService = new APIService();
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err,values) => {
      if (!err){
        this.APIService.login(values).then(res => {
          this.props.history.replace('/')
        }).catch(err => {
          if(err.message === "Unauthorized"){
            message.error('Usuario o contraseña invalidos', 3);
          }else{
            message.error('Problema con el servidor, intente más tarde...', 3)
          }
        })
      }
    });
  }

  render (){
    const {getFieldDecorator} = this.props.form;
    return (
      <Layout className="layout">
        <Header className="login-header">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>

        </Header>
        <Content>
          <Row type="flex" justify="space-around" align="middle">
            <Col span={12} offset={6}>
              <Card title="Login" style={{ width: '350px'}} >
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('rut', {
                      rules: [{required: true, message: 'Please input your rut'}],
                    })(
                      <Input placeholder="12345678-k" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: 'Please input your password'}],
                    })(
                      <Input type="password" placeholder="Password" />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer className="login-footer">
          <p> Derechos de autor :D </p>
        </Footer>
      </Layout>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);
export default WrappedLoginForm;
