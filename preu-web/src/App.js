import React, { Component } from 'react';
import APIService from './lib/APIService';
import withAuth from './lib/withAuth';
import {Layout, Menu} from 'antd';
import logo from './components/logo.svg';
import './App.css';

const Auth = new APIService();
const { Header, Footer, Sider, Content} = Layout;
class App extends Component {
  handleLogout(){
    Auth.logout()
    this.props.history.replace('/login')
  }
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type ) => {console.log(collapsed, type);}}
        >
          <img src={logo} className="App-logo" alt="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <span className="nav-text" onClick={this.handleLogout.bind(this)}>
                Logout
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, textAlign: 'right'}}>
            {this.props.user.nombre }
          </Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{ padding: 24, backgroud: '#fff', minHeight: 360}}>
              Contenido :D
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Footer :c
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default withAuth(['Administrador', 'Alumno', 'Voluntario'])(App);
