import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Select } from 'antd';
import './../CreateUsers.css';

const FormItem = Form.Item;
const Option = Select.Option;

class VolunteerFields extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    ;
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.saveType(values.tipo)
        delete values.tipo
        this.props.saveValues({
          name: 'volunteer',
          data: values
        })
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit} className="user-form">
        <FormItem
          {...this.props.formItemLayout}
          label="Universidad"
        >
          { getFieldDecorator('universidad',{
            rules: [{
              required: true, message: 'Porfavor ingresa la universidad del voluntario!',
            }]
          })(
            <Input placeholder="Universidad Diego Portales" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Carrera"
        >
          { getFieldDecorator('carrera', {
            rules: [{
              required: true, message: 'Porfavor ingresa la carrera del voluntario!',
            }]
          })(
            <Input placeholder="Odontología" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Años cursados"
        >
          { getFieldDecorator('años_cursados', {
            rules: [{
              type: 'number', message: "Porfavor ingresa un valor númerico!",
            },{
              required: true, message: "Porfavor ingresa los años cursados en la carrera del voluntario!",
            }]
          })(
            <InputNumber min={0} placeholder="2" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Tipo de voluntario"
        >
          { getFieldDecorator('tipo',{
            rules: [{
              required: true, message: "Porfavor selecciona el tipo de voluntario!",
            }]
          })(
            <Select style={{ width: 300 }} placeholder="Seleccione un tipo de voluntario">
              <Option value="docente">Docente</Option>
              <Option value="ensayos">Encargado de Ensayos</Option>
              <Option value="contraloria">Encargado de Contraloria</Option>
              <Option value="impresiones">Encargado de Impresiones</Option>
              <Option value="admin">Administrador</Option>
            </Select>
          )}
          </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="form-button">
            Enviar
          </Button>
          <Button onClick={this.props.prev} className="form-button-back">
            Volver
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedVolunteerFields = Form.create()(VolunteerFields);
export default WrappedVolunteerFields;
