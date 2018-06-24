import React, { Component } from 'react';
import APIService from '../../../lib/APIService';
import withAuth from '../../../lib/withAuth';
import WrappedUserFields from '../UserFields';
import WrappedVolunteerFields from './VolunteerFields';
import { Steps, message } from 'antd';
import './../CreateUsers.css';

const Step = Steps.Step;
export default class CreateVolunteer extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      user: null,
      volunteer: null,
      type: null,
    }
    this.saveValues = this.saveValues.bind(this);
    this.saveType = this.saveType.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.APIService = new APIService();
  }

  saveValues(field){
    this.setState({
      [field['name']]: field['data'],
    }, () => {
      this.next()
    })
  }

  saveType(type){
    this.setState({
      type: type,
    })
  }
  next(){
    this.setState({
      current: this.state.current + 1,
    }, () => {
      if(this.state.current === 2){
        const values = JSON.stringify({
          type: this.state.type,
          user: this.state.user,
          volunteer: this.state.volunteer,
        });
        this.APIService.fetch('/voluntarios', {
          method: 'POST',
          body: values,
        }).then(res => {
          message.success(res.message);
          this.props.history.replace('/')
        })
      }
    })
  }
  prev(){
    this.setState({
      current: this.state.current - 1,
    })
  }

  render() {
    const { current } = this.state;
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
    return(
      <div>
        <Steps current={current}>
          <Step title="Información del Usuario" />
          <Step title="Información del Voluntario" />
        </Steps>
        <div className="content">
          {(() => {
            switch(current){
              case 0:
                return <WrappedUserFields
                  saveValues={this.saveValues}
                  formItemLayout={formItemLayout} />;
              case 1:
                return <WrappedVolunteerFields
                  saveValues={this.saveValues}
                  saveType={this.saveType}
                  prev={this.prev}
                  formItemLayout={formItemLayout} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    )
  }


}
