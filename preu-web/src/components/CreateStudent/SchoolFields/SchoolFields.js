import React, { Component } from 'react';
import { Form, Switch, Button } from 'antd';
import SchoolTable from './SchoolTable';
import WrappedCreateSchool from './CreateSchool';
import './../CreateStudents.css';


class SchoolFields extends Component {
  constructor(props){
    super(props);
    this.state = {
      choose: true,
      colegio_id: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.tableId = this.tableId.bind(this);
  }
  handleSubmit(e){
    this.props.saveValues({
      name: 'school',
      data: this.state.colegio_id,
    })
  }
  tableId(e) {
    this.setState({ colegio_id: e[0] })
  }
  onChange(e){
    this.setState({
      choose: e,
      colegio_id: null,
    });
  }

  render() {
    return (
      <div>
        <Switch
          checkedChildren="Elegir un colegio de la lista"
          unCheckedChildren="Crear un nuevo colegio"
          onChange={this.onChange}
          checked={this.state.choose}
          defaultChecked
        />
        <div>

          {
              this.state.choose &&
            <div>
              <SchoolTable selected={this.tableId}/>
              <div>
              </div>
              <Button type="primary" onClick={this.handleSubmit} className="form-button">
                Siguiente
              </Button>
              <Button onClick={this.props.prev} className="form-button-back">
                Volver
              </Button>
            </div>
          }
          {
              !this.state.choose &&
            <WrappedCreateSchool
              saveValues={this.props.saveValues}
              prev={this.props.prev}
              formItemLayout={this.props.formItemLayout}
            />
          }

        </div>
      </div>
    );
  }
}
const WrappedSchoolFields = Form.create()(SchoolFields);
export default WrappedSchoolFields;
