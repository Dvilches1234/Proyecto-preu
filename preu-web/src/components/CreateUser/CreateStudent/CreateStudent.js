import React, { Component } from 'react';
import APIService from './../../../lib/APIService';
import withAuth from './../../../lib/withAuth';
import { Steps, Button, message } from 'antd';
import WrappedUserFields from './../UserFields';
import WrappedStudentFields from './StudentFields';
import WrappedSchoolFields from './SchoolFields/SchoolFields';
import WrappedAcademicsFields from './AcademicsFields';
import WrappedEconomicsFields from './EconomicsFields';
import './../CreateUsers.css';
const Step = Steps.Step;

export default class CreateStudent extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      user: null,
      student: null,
      school: null,
      academics: null,
      economics: null,
      documents: null,
    };
    this.saveValues = this.saveValues.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.APIService = new APIService();
    this.saveDocument = this.saveDocument.bind(this);
  }

  saveDocument(field){
    this.setState({
      documents: field['data'],
    })
  }
  saveValues(field){
    this.setState({
      [field['name']]: field['data']
    }, () => {
      this.next();
    });
  }
  next() {
    this.setState({current: this.state.current + 1 }, () => {
      if(this.state.current === 5){
        const values = JSON.stringify({
          user: this.state.user,
          student: this.state.student,
          school: this.state.school,
          academics: this.state.academics,
          economics: this.state.economics,
          document: this.state.documents,
        });
        this.APIService.fetch('/alumnos', {
          method: 'POST',
          body: values,
          }).then(res => {
            message.success(res.message);
            this.props.history.replace('/')
        })
      }
    });
  }

  prev() {
    this.setState({current:  this.state.current - 1 });
  }

  render() {
    const {current} = this.state;
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
    return (
      <div>
        <Steps current={current}>
          <Step title="Información del usuario" />
          <Step title="Información del alumno" />
          <Step title="Información del colegio" />
          <Step title="Información academica" />
          <Step title="Información socioeconomica" />
        </Steps>
        <div className="content">
          {(() => {
            switch(current){
              case 0:
                return <WrappedUserFields
                  saveValues={this.saveValues}
                  formItemLayout={formItemLayout} />;
              case 1:
                return <WrappedStudentFields
                  saveValues={this.saveValues}
                  prev={this.prev}
                  formItemLayout={formItemLayout} />;
              case 2:
                return <WrappedSchoolFields
                  saveValues={this.saveValues}
                  prev={this.prev}
                  formItemLayout={formItemLayout} />;
              case 3:
                return <WrappedAcademicsFields
                  saveDocument={this.saveDocument}
                  saveValues={this.saveValues}
                  prev={this.prev}
                  formItemLayout={formItemLayout} />;
              case 4:
                return <WrappedEconomicsFields
                  saveValues={this.saveValues}
                  prev={this.prev}
                  formItemLayout={formItemLayout} />
              default :
                return null;
            }
          })()}
        </div>
      </div>
    )
  }
}
