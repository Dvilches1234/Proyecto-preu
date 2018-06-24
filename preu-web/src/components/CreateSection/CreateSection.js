import React, { Component } from 'react';
import { Form, Select, Cascader , Button, Icon, Checkbox, message } from 'antd';
import APIService from './../../lib/APIService';
import withAuth from './../../lib/withAuth';
import './CreateSection.css';

const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 1;
const options = [{
  value: 'Lunes',
  label: 'Lunes',
  children: [{
    value: 'A',
    label: 'Bloque A'
  },{
    value: 'B',
    label: 'Bloque B'
  },{
    value: 'C',
    label: 'Bloque C'
  },{
    value: 'D',
    label: 'Bloque D'
  },{
    value: 'E',
    label: 'Bloque E'
  },{
    value: 'F',
    label: 'Bloque F'
  }]
},{
  value: 'Martes',
  label: 'Martes',
  children: [{
    value: 'A',
    label: 'Bloque A'
  },{
    value: 'B',
    label: 'Bloque B'
  },{
    value: 'C',
    label: 'Bloque C'
  },{
    value: 'D',
    label: 'Bloque D'
  },{
    value: 'E',
    label: 'Bloque E'
  },{
    value: 'F',
    label: 'Bloque F'
  }]
},{
  value: 'Miercoles',
  label: 'Miercoles',
  children: [{
    value: 'A',
    label: 'Bloque A'
  },{
    value: 'B',
    label: 'Bloque B'
  },{
    value: 'C',
    label: 'Bloque C'
  },{
    value: 'D',
    label: 'Bloque D'
  },{
    value: 'E',
    label: 'Bloque E'
  },{
    value: 'F',
    label: 'Bloque F'
  }]
},{
  value: 'Jueves',
  label: 'Jueves',
  children: [{
    value: 'A',
    label: 'Bloque A'
  },{
    value: 'B',
    label: 'Bloque B'
  },{
    value: 'C',
    label: 'Bloque C'
  },{
    value: 'D',
    label: 'Bloque D'
  },{
    value: 'E',
    label: 'Bloque E'
  },{
    value: 'F',
    label: 'Bloque F'
  }]
},{
  value: 'Viernes',
  label: 'Viernes',
  children: [{
    value: 'A',
    label: 'Bloque A'
  },{
    value: 'B',
    label: 'Bloque B'
  },{
    value: 'C',
    label: 'Bloque C'
  },{
    value: 'D',
    label: 'Bloque D'
  },{
    value: 'E',
    label: 'Bloque E'
  },{
    value: 'F',
    label: 'Bloque F'
  }]
}]
class CreateSection extends Component{
  constructor(props){
    super(props);
    this.state = {
      ciencias: false,
    }
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.APIService = new APIService();

  }
  onChange(value){
    this.setState({
      ciencias: value === "quimica" || value === "biologia" || value === "fisica"
    })
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let horarios = [{
          dia: values.horarios[0][0],
          bloque: values.horarios[0][1],
        }];
        for(let i = 1; i < values.horarios.length; i++){
          if(values.keys.includes(i)){
            horarios = [...horarios, {
              dia: values.horarios[i][0],
              bloque: values.horarios[i][1],
            }]
          }
        }
        let codigo = values.asignatura.substring(0,3).toUpperCase() + '-';
        if(!values.ensayo && !values.electivo){
          codigo += "1000"
        }else if(!values.ensayo && values.electivo){
          codigo += "2000"
        }else if(values.ensayo && !values.electivo){
          codigo += "3000"
        }else{
          codigo += "4000"
        }
        this.APIService.fetch('/seccions', {
          method: "POST",
          body: JSON.stringify({
            asignatura: values.asignatura,
            horario: horarios,
            codigo: codigo,
          })
        }).then(res => {
          message.success(res.message);
          this.props.history.replace('/');
        })
      }
    });
  }
  remove(k){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  add(){
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++
    form.setFieldsValue({
      keys: nextKeys,
    })
  }
  render(){
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayoutWithOutLabel}
          label=''
          required={false}
          key={k}
        >
          { getFieldDecorator(`horarios[${k}]`, {
            rules: [{
              required: true, message: 'Porfavor selecciona una asignatura!'
            }]
          })(
            <Cascader
              options={options}
              expandTrigger="hover"
              className="horarios-cascader"

            />
          )}
          <Icon
            className="delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        </FormItem>
          )
          })
          return(
          <Form onSubmit={this.handleSubmit} className="section-form">
            <FormItem
              {...formItemLayout}
              label="Asignatura"
            >
              { getFieldDecorator('asignatura', {
                rules: [{
                    required: true, message: 'Porfavor selecciona una asignatura!'
                }]
              })(
                <Select
                  onChange={this.onChange}
                  className="select-form"
                  placeholder="Seleccione una asignatura"
                >
                  <Option value="matematicas">Matematicas</Option>
                  <Option value="lenguaje">Lenguaje</Option>
                  <Option value="historia">Historia</Option>
                  <Option value="quimica">Quimica</Option>
                  <Option value="biologia">Biologia</Option>
                  <Option value="fisica">Fisica</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Horarios"
            >
              {getFieldDecorator('horarios[0]',{
                rules: [{
                    required: true, message: "Porfavor seleccione un horario o borrelo!",
                }]
              })(
                <Cascader
                  options={options}
                  expandTrigger="hover"
                  className="horarios-cascader"
                  placeholder="Seleccione un horario"
                />
              )}
            </FormItem>
            {formItems}
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} className="add-button">
                <Icon type="plus" /> Agregar Horario
              </Button>
            </FormItem>
            {
              this.state.ciencias &&
              <FormItem
                {...formItemLayout}
                label="¿Es Electivo?"
              >
                { getFieldDecorator('electivo',{
                  initialValue: false,
                })(
                  <Checkbox />
                )}
              </FormItem>
            }
            <FormItem
              {...formItemLayout}
              label="¿Es sección de ensayos?"
            >
              { getFieldDecorator('ensayo', {
                initialValue: false,
              })(
                <Checkbox />
              )}
            </FormItem>
            <FormItem {...formItemLayoutWithOutLabel}>
              <Button type="primary" htmlType="submit" className="form-button">
                Enviar
              </Button>
            </FormItem>
          </Form>
    )
  }
}

const WrappedCreateSection = Form.create()(CreateSection);
export default WrappedCreateSection;
