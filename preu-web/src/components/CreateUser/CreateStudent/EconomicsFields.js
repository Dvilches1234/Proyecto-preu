import React, { Component }  from 'react';
import { Form, Button, Input, InputNumber, Select, Switch, Checkbox } from 'antd';
import './../CreateUsers.css';

const FormItem = Form.Item;
const Option = Select.Option;

class EconomicsFields extends Component {
  constructor(props){
    super(props);
    this.state = {
      worker: true,
      members: 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.numberChange = this.numberChange.bind(this);
  }

  numberChange(value){
    this.setState({ members: value});
  }
  onChange(checked){
    this.setState({worker: checked});
  }
  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.saveValues({
          name: 'economics',
          data: values,
        });
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="student-form">
        <FormItem
          {...this.props.formItemLayout}
          label="Integrantes en el hogar"
        >
          { getFieldDecorator('numero_integrantes',{
            rules: [{
              type: 'number', message: 'Porfavor ingrese un valor númerico!',
            },{
              required: true, message: 'Porfavor ingrese la cantidad de integrantes en el hogar del alumno!',
            }],
          })(
            <InputNumber min={1} placeholder="1" onChange={this.numberChange} />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Ingreso total en el hogar"
        >
          { getFieldDecorator('ingreso_total',{
            rules: [{
              type: 'number', message: 'Porfavor ingrese un valor númerico!',
            },{
              required: true, message: 'Porfavor ingrese el monto total de ingreso en el hogar del alumno!',
            }]
          })(
            <InputNumber min={0} placeholder="0" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Estado de la vivienda del alumno"
        >
          { getFieldDecorator('estado_vivienda', {
            rules: [{
              required: true, message: 'Porfavor seleccione el estado de la vivienda del alumno!',
            }],
          })(
            <Select style={{ width: 300 }} placeholder="Seleccione el estado de la vivienda">
              <Option value="propia">Vivienda Propia</Option>
              <Option value="arriendo">En Arriendo</Option>
              <Option value="allegado">Allegado</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Integrantes con trabajo estable"
        >
          { getFieldDecorator('integrantes_trabajo_estable',{
            rules: [{
              type: 'number', message: 'Porfavor ingrese un valor númerico',
            },{
              required: true, message: 'Porfavor indique cuantos integrantes del hogar del alumno tienen trabajo estable!',
            },{
              type: 'number',
              min: 0,
              max: this.state.members,
              message: 'No pueden haber más integrantes con trabajo estable que los miembros del hogar!',
            }],
          })(
            <InputNumber min={0} placeholder={0} />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="¿El estudiante es trabajador?"
        >
          { getFieldDecorator('trabajador', {
            initialValue: this.state.worker,
            rules: [{
              type: 'boolean', required: true
            }]
          })(
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              onChange={this.onChange}
              checked={this.state.worker}
            />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Trabajo actual del alumno"
        >
          { getFieldDecorator('trabajo', {
            initialValue: null,
            rules: [{
              required: this.state.worker, message: "Porfavor ingrese el trabajo del alumno!",
            }]
          })(
            <Input disabled={!this.state.worker} />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="¿El alumno cuenta con acceso a internet?"
        >
          { getFieldDecorator('internet', {

            initialValue: false,
            rules: [{
              type: 'boolean',
            }]
          })(
            <Checkbox />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="¿El alumno tiene un computador?"
        >
          { getFieldDecorator('computador', {
            initialValue: false,
            rules: [{
              type: 'boolean',
            }]
          })(
            <Checkbox />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="¿El alumno tiene problemas de transporte al preu-universitario?"
        >
          { getFieldDecorator('problemas_transporte', {
            initialValue: false,
            rules: [{
              type: 'boolean',
            }]
          })(
            <Checkbox />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="¿El alumno tiene problemas para pagar la cuota inicial?"
        >
          { getFieldDecorator('puede_pagar', {
            initialValue: false,
            rules: [{
              type: 'boolean',
            }]
          })(
            <Checkbox />
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

const WrappedEconomicsFields = Form.create()(EconomicsFields);
export default WrappedEconomicsFields;
