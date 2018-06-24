import React, { Component } from 'react';
import { Form, Input, Select, Button} from 'antd';
import APIService from './../../../../lib/APIService';
import './../../CreateUsers.css';
const FormItem = Form.Item;
const Option = Select.Option;
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

class CreateSchool extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.APIService = new APIService();
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.APIService.fetch('/colegios', {
          method: 'POST',
          body: JSON.stringify(values),
        }).then(res => {
          this.props.saveValues({
            name: 'school',
            data: res.colegio_id,
          })
        });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const options = comunas.map(d => <Option key={d.value}>{d.text}</Option>);
    return (
      <div>
        <Form  onSubmit={this.handleSubmit} className="student-form">
          <FormItem
            {...this.props.formItemLayout}
            label="Nombre del colegio"
          >
            {getFieldDecorator('nombre', {
              rules: [{
                required: true, message: "Porfavor ingresa el nombre del colegio!",
              }],
            })(
              <Input placeholder="Liceo A12"/>
            )}
          </FormItem>
          <FormItem
            {...this.props.formItemLayout}
            label="Comuna del colegio"
          >
            { getFieldDecorator('comuna', {
              rules: [{
                required: true, message: "Porfavor ingrese la comuna del colegio!",
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
            label="Rut"
          >
            {getFieldDecorator('dependencia', {
              rules: [{
                required: true, message: "Porfavor selecciona un tipo de dependencia del colegio"
              }]
            })(
              <Select style={{ width: 300}} placeholder="Selecciona un tipo de dependencia">
                <Option value="Municipal"> Municipal </Option>
                <Option value="Particular Subvencionado"> Particular Subvencionado</Option>
                <Option value="Particular Pagado"> Particular Pagado</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...this.props.formItemLayout}
            label="Rut"
          >
            { getFieldDecorator('tipo', {
              rules: [{
                required: true, message: "Porfavor selecciona almenos un tipo de establecimiento"
              }]
            })(
              <Select style={{ width: 300}} placeholder="Porfavor selecciona un tipo de establecimiento">
                <Option value="c"> Educación Científico Humanista</Option>
                <Option value="t"> Educación Técnico Profesional</Option>
                <Option value="a"> Educación de Adultos</Option>
                <Option value="e"> Educación Especial</Option>
              </Select>
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="form-button">
              Crear colegio
            </Button>
            <Button onClick={this.props.prev} className="form-button-back">
              Volver
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const WrappedCreateSchool = Form.create()(CreateSchool);
export default WrappedCreateSchool;
