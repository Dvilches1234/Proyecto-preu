import React, { Component } from 'react';
import { Form, Input, InputNumber, Select, Upload, Cascader, Button, Icon, message } from 'antd';
import './CreateStudents.css';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

const options = [{
  value: 'basica',
  label: 'Enseñanza Basica',
  children: [{
    value: 'completa',
    label: 'Completa',
  },{
    value: 'incompleta',
    label: 'Incompleta',
  }],
},{
  value: 'media',
  label: 'Enseñanza Media',
  children: [{
    value: 'completa',
    label: 'Completa',
  },{
    value: 'incompleta',
    label: 'Incompleta',
  }],
},{
  value: 'tecnico',
  label: 'Enseñanza Tecnica',
  children: [{
    value: 'completa',
    label: 'Completa',
  },{
    value: 'incompleta',
    label: 'Incompleta',
  }]
},{
  value: 'universitaria',
  label: 'Universitaria',
  children: [{
    value: 'completa',
    label: 'Completa',
  },{
    value: 'incompleta',
    label: 'Incompleta',
  }],
}];
class AcademicsFields extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileList: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.display = this.display.bind(this);
  }

  getBase64(file, cb){
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
      cb(reader.result)
    };
  }
  display(label){
    return label[label.length - 1];
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        values.promedio_primero = values.promedio_primero*10;
        values.promedio_segundo = values.promedio_segundo*10;
        values.promedio_tercero = values.promedio_tercero*10;
        values.promedio_cuarto = values.promedio_cuarto*10;
        values.nivel_educacional = values.nivel_educacional[0] + " " + values.nivel_educacional[1];
        delete values.certificado;
        this.props.saveValues({
          name: 'academics',
          data: values,
        });
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 },
      },
    };
    const props ={
      action: '#',
      onRemove: (file) => {
        this.setState(({ fileList}) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index,1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isPDF = file.type === 'application/pdf';
        if(!(isJPG || isPNG || isPDF)){
          message.error('Solo se pueden subir imagenes o archivos pdf!')
          return false;
        }
        this.setState(({ fileList}) => ({
          fileList: [file],
        }));

        this.getBase64(file, (result) => {
          this.props.saveDocument({
            data: {
            doc_contents: result,
            doc_name: file.name,
            },
          });
        });
        return false;
      },
      fileList: this.state.fileList,
    }
    return(
      <Form onSubmit={this.handleSubmit} className="student-form">
        <FormItem {...formItemLayout} label="Situación Academica">

          { getFieldDecorator('situacion_academica', {
            rules: [{
              required: true, message: 'Porfavor seleccione la situación academica del alumno!',
            }],
          })(
            <Select style={{ width: 300 }} placeholder="Selecciona una situación academica">
              <Option value="recienegresado">Egresado</Option>
              <Option value="cursando"> Cursando Enseñanza Media</Option>
              <Option value="egresadohace2años">Egresado hace dos años</Option>
              <Option value="2x1">Haciendo un 2x1</Option>
              <Option value="superior"> Cursando Educación Superior</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Promedio final de primero medio">
          { getFieldDecorator('promedio_primero', {
            rules: [{
              type: 'number', message: 'Porfavor ingresa un valor númerico!',
            },{
              required: true, message: 'Porfavor ingresa el promedio de primero medio del alumno!',
            }],
          })(
            <InputNumber min={1.0} max={7.0} step={0.1} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Promedio final de segundo medio">
          { getFieldDecorator('promedio_segundo', {
            rules: [{
              type: 'number', message: 'Porfavor ingresa un valor númerico!',
            },{
              required: true, message: 'Porfavor ingresa el promedio de segundo medio del alumno!',
            }]
          })(
            <InputNumber min={1.0} max={7.0} step={0.1} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Promedio final de tercero medio">
          { getFieldDecorator('promedio_tercero', {
            rules: [{
              type: 'number', message: 'Porfavor ingresa un valor númerico!',
            },{
              required: true, message: 'Porfavor ingresa el promedio de tercero medio del alumno!',
            }]
          })(
            <InputNumber min={1.0} max={7.0} step={0.1} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Promedio final de cuarto medio">
          { getFieldDecorator('promedio_cuarto', {
            rules: [{
              type: 'number', message: 'Porfavor ingresa un valor númerico!',
            }]
          })(
            <InputNumber min={1.0} max={7.0} step={0.1} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Nivel educacional">
          { getFieldDecorator('nivel_educacional', {
            rules: [{
              required: true, message: 'Porfavor seleccione el nivel educacional del alumnos!'
            }]
          })(
            <Cascader
              options={options}
              expandTrigger="hover"
              placeholder="Seleccione el nivel educacional del alumno"
              className="student-cascader"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Observaciones">
          { getFieldDecorator('observaciones', {
            rules: [{
              required: true, message: 'Porfavor ingrese las observaciones del alumno!',
            }]
          })(
            <TextArea autosize={{minRows: 4, maxRows: 8}} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="Certificado de Notas">
          { getFieldDecorator('certificado')(
            <Upload {...props}>
              <Button>
                <Icon type="upload"/> Subir certificado
              </Button>
            </Upload>
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

const WrappedAcademicsFields = Form.create()(AcademicsFields);
export default WrappedAcademicsFields;
