import React, { Component } from 'react';
import {Button, Form, Input , Icon } from 'antd';
import './CreateUsers.css';

const FormItem = Form.Item;

class UserFields extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.saveValues({
          name: 'user',
          data: values
        })
      }
    });

  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="user-form">
        <FormItem
          {...this.props.formItemLayout}
          label="Rut"
        >
          {getFieldDecorator('rut', {
            rules: [{ required: true, message:'Porfavor ingresa un rut!'}],
          })(
            <Input placeholder="12345678-9" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Nombres"
        >
          { getFieldDecorator('nombres', {
            rules: [{required: true, message: 'Porfavor ingresa un nombre!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Apellidos"
        >
          { getFieldDecorator('apellidos', {
            rules: [{required: true, message: 'Porfavor ingresa un apellido!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Email"
        >
          { getFieldDecorator('email', {
            rules:[{
              type: 'email', message: 'El correo ingresado no es valido!',
            }, {
              required: true, message: 'Porfavor ingresa un correo!',
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Teléfono"
        >
          { getFieldDecorator('telefono', {
            rules: [{
              len: 9, message: 'El telefono ingresado no es valido!',
            }]
          })(
            <Input placeholder={912345678}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="form-button">
            Siguiente
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedUserFields = Form.create()(UserFields);
export default WrappedUserFields;
