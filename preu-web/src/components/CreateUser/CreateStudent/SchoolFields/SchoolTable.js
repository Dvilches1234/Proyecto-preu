import React, { Component } from 'react';
import { Table, Icon, Input, Button } from 'antd';
import APIService from './../../../../lib/APIService';
import './../../CreateUsers.css';

class SchoolTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterDropdownVisible: false,
      showData: [],
      data: [],
      searchText: '',
      filtered: false,
      loading: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.fetch = this.fetch.bind(this);
    this.APIService = new APIService();
  }
  fetch(){
    this.setState({
      loading: true
    });
    this.APIService.fetch('/colegios', {
      method: 'GET',
      data: {},
    }).then((data) => {
      this.setState({
        loading: false,
        data: data.results,
        showData: data.results,
      });
    });
  }

  componentDidMount(){
    this.fetch();
  }
  onInputChange(e){
    this.setState({ searchText: e.target.value});
  }

  onSearch(){
    this.setState({
      loading: true,
    })
    const {searchText} = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      showData: this.state.data.map((record) => {
        const match = record.name.match(reg);
        if (!match){
          return null;
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(new RegExp(`(?!${searchText})|(?=${searchText})`, 'i')).map((text, i) => (
                text.toLowerCase() === searchText.toLowerCase() ?
                  <span key={i} className="highlight">{text}</span> : text //eslint-disable-line
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
    this.setState({
      loading: false,
    })
  }
  render() {
    const columns = [{
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 500,
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            ref={ele => this.searchInput = ele}
            placeholder="Buscar Colegio"
            value={this.state.searchText}
            onChange={this.onInputChange}
            onPressEnter={this.onSearch}
          />
          <Button type="primary" onClick={this.onSearch}>Buscar</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: (visible) => {
        this.setState({
          filterDropdownVisible: visible,
        }, () => this.searchInput && this.searchInput.focus());
      },
    }, {
      title: 'Comuna',
      dataIndex: 'district',
      key: 'district',
      width: 300,
    }, {
      title: 'Tipo de dependencia',
      dataIndex: 'dependency',
      key: 'dependency',
      width: 300,
      filters: [{
        text: 'Municipal',
        value: 'Municipal',
      },{
        text: 'Particular Subvencionado',
        value: 'Particular Subvencionado',
      },{
        text: 'Particular Pagado',
        value: 'Particular Pagado',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.dependency.indexOf(value) === 0,
    }, {
      title: 'Tipo de establecimiento',
      dataIndex: 'type',
      key: 'type',
      filters: [{
        text: 'Científico Humanista',
        value: 'Científico Humanista',
      },{
        text: 'Técnico Profesional',
        value: 'Técnico Profesional'
      },{
        text: 'Educación Especial',
        value: 'Educación Especial',
      },{
        text: 'Educación de Adultos',
        value: 'Educación de Adultos',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    }];
    const rowSelection = {
      onChange: this.props.selected,
      type: 'radio',
    };
    return(
      <div>
        <Table
          scroll={{ y: 300}}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.showData}
          pagination={false}
          loading={this.state.loading}
          bordered
        />
      </div>
      );
  }
}
export default SchoolTable;
