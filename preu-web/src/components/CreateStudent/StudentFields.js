import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/es_ES';
import moment from 'moment';
import './CreateStudents.css';
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'DD/MM/YYYY';
const {TextArea} = Input;
const comunas = [{
  value: 'Alhué',
  text: 'Alhué',
}, {
  value: 'Buin',
  text: 'Buin',
}, {
  value: 'Calera de Tango',
  text: 'Calera de Tango',
}, {
  value: 'Cerrillos',
  text: 'Cerrillos',
}, {
  value: 'Cerro Navia',
  text: 'Cerro Navia',
}, {
  value: 'Colina',
  text: 'Colina',
}, {
  value: 'Conchalí',
  text: 'Conchalí',
}, {
  value: 'Curacaví',
  text: 'Curacaví',
}, {
  value: 'El Bosque',
  text: 'El Bosque',
}, {
  value: 'El Monte',
  text: 'El Monte',
}, {
  value: 'Estación Central',
  text: 'Estación Central',
}, {
  value: 'Huechuraba',
  text: 'Huechuraba',
}, {
  value: 'Independencia',
  text: 'Independencia',
}, {
  value: 'Isla de Maipo',
  text: 'Isla de Maipo',
}, {
  value: 'La Cisterna',
  text: 'La Cisterna',
}, {
  value: 'La Florida',
  text: 'La Florida',
}, {
  value: 'La Granja',
  text: 'La Granja',
}, {
  value: 'La Pintana',
  text: 'La Pintana',
}, {
  value: 'La Reina',
  text: 'La Reina',
}, {
  value: 'Lampa',
  text: 'Lampa',
}, {
  value: 'Las Condes',
  text: 'Las Condes',
}, {
  value: 'Lo Barnechea',
  text: 'Lo Barnechea',
}, {
  value: 'Lo Espejo',
  text: 'Lo Espejo',
}, {
  value: 'Lo Prado',
  text: 'Lo Prado',
}, {
  value: 'Macul',
  text: 'Macul',
}, {
  value: 'Maipú',
  text: 'Maipú',
}, {
  value: 'María Pinto',
  text: 'María Pinto',
}, {
  value: 'Melipilla',
  text: 'Melipilla',
}, {
  value: 'Ñuñoa',
  text: 'Ñuñoa',
}, {
  value: 'Padre Hurtado',
  text: 'Padre Hurtado',
}, {
  value: 'Paine',
  text: 'Paine',
}, {
  value: 'Pedro Aguirre Cerda',
  text: 'Pedro Aguirre Cerda',
}, {
  value: 'Peñaflor',
  text: 'Peñaflor',
}, {
  value: 'Peñalolén',
  text: 'Peñalolén',
}, {
  value: 'Pirque',
  text: 'Pirque',
}, {
  value: 'Providencia',
  text: 'Providencia',
}, {
  value: 'Pudahuel',
  text: 'Pudahuel',
}, {
  value: 'Puente Alto',
  text: 'Puente Alto',
}, {
  value: 'Quilicura',
  text: 'Quilicura',
}, {
  value: 'Quinta Normal',
  text: 'Quinta Normal',
}, {
  value: 'Recoleta',
  text: 'Recoleta',
}, {
  value: 'Renca',
  text: 'Renca',
}, {
  value: 'San Bernardo',
  text: 'San Bernardo',
}, {
  value: 'San Joaquín',
  text: 'San Joaquín',
}, {
  value: 'San José de Maipo',
  text: 'San José de Maipo',
}, {
  value: 'San Miguel',
  text: 'San Miguel',
}, {
  value: 'San Pedro',
  text: 'San Pedro',
}, {
  value: 'San Ramón',
  text: 'San Ramón',
}, {
  value: 'Santiago Centro',
  text: 'Santiago Centro',
}, {
  value: 'Talagante',
  text: 'Talagante',
}, {
  value: 'Tiltil',
  text: 'Tiltil',
}, {
  value: 'Vitacura',
  text: 'Vitacura',
}];

class StudentFields extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        values.fecha_de_nacimiento = moment(values.fecha_de_nacimiento).format(dateFormat)
        this.props.saveValues({
          name: 'student',
          data: values
        })
      }
    })
  }

  /*  fecha_de_nacimiento  date,
      sexo                 char,
      comuna               string,
      direccion            string,
      motivacion           string,
  */
  render() {
    const { getFieldDecorator } = this.props.form;
    const options = comunas.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <Form onSubmit={this.handleSubmit} className="student-form">
        <FormItem
          {...this.props.formItemLayout}
          label="Fecha de nacimiento"
        >
          { getFieldDecorator('fecha_de_nacimiento', {
            rules: [{
              required: true, message: 'Porfavor elige una fecha!'
            }],
          })(
            <DatePicker locale={locale} format={dateFormat} placeholder="Seleccione una fecha" />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Sexo"
        >
          { getFieldDecorator('sexo', {
            rules: [{
              required: true, message: "Porfavor selecciona una opción!"
            }],
          })(
            <Select placeholder="Seleccione un genero">
              <Option value="m"> Masculino </Option>
              <Option value="f"> Femenino </Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Comuna"
        >
          { getFieldDecorator('comuna', {
            rules: [{
              required: true, message: 'Porfavor selecciona una opción!'
            }],
          })(
            <Select
              showSearch
              placeholder="Seleccione una comuna"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              {options}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Dirección"
        >
          { getFieldDecorator('direccion', {
            rules: [{
              required: true, message: 'Porfavor ingresa una direccion!'
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...this.props.formItemLayout}
          label="Motivación"
        >
          { getFieldDecorator('motivacion', {
            rules: [{
              required: true, message: 'Porfavor ingresa una motivación!'
            }]
          })(
            <TextArea autosize={{minRows: 4, maxRows: 8}} />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="form-button">
            Siguiente
          </Button>
          <Button onClick={this.props.prev} className="form-button-back">
            Volver
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedStudentFields = Form.create()(StudentFields);
export default WrappedStudentFields;
