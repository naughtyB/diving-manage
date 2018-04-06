import React from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
const SubMenu = Menu.SubMenu;

class AppSiderMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      openKeys : ['pageManage'],
      selectedKeys : ['homepage']
    }
    this.handleSelect = this.handleSelect.bind(this);   
    this.handleOpenChange = this.handleOpenChange.bind(this); 
  }
  componentWillMount(){
    let pathname = this.props.location.pathname;
    if(/\/([^\/]+?)\/([^\/]+)/.test(pathname)){
      this.setState({
        openKeys: [pathname.replace(/\/([^\/]+?)\/[\s\S]+/, '$1')],
        selectedKeys: [pathname.replace(/\/([^\/]+?)\/([^\/]+)(\/)*[\S\s]*/, '$2')]
      })
    }
  }
  componentWillUpdate(nextProps){
    let pathname = this.props.location.pathname;
    let nextPathname = nextProps.location.pathname;
    if(pathname !== nextPathname && /\/([^\/]+?)\/([^\/]+)/.test(nextPathname)){
      this.setState({
        openKeys: [nextPathname.replace(/\/([^\/]+?)\/[\s\S]+/, '$1')],
        selectedKeys: [nextPathname.replace(/\/([^\/]+?)\/([^\/]+)(\/)*[\S\s]*/, '$2')]
      })
    }
    if(this.props.collapsed !== nextProps.collapsed && nextProps.collapsed){
      this.setState({
        openKeys: []
      })
    }
  }
  handleSelect({ item, key, selectedKeys }){
    if(selectedKeys[0] !== this.state.selectedKeys[0]){
      this.props.history.push({
        pathname: '/' + item.props.openKeys[0] + '/' + selectedKeys[0]
      })
    }
  }
  handleOpenChange(openKeys){
    if(openKeys[1] !== this.state.openKeys[0]){
      this.setState({
        openKeys: [openKeys[1]]
      })
    }
    else{
      this.setState({
        openKeys: ['']
      })
    }
  }
  render() {
    return (
      <Menu
        theme="dark"
        selectedKeys={this.state.selectedKeys}
        onOpenChange={this.handleOpenChange}
        onSelect={this.handleSelect}
        openKeys={this.state.openKeys}
        mode="inline"
      >
        <SubMenu key="pageManage" title={<span><Icon type="appstore"/><span>页面管理</span></span>}>
          <Menu.Item key="homepage">首页管理</Menu.Item>
          <Menu.Item key="course">课程管理</Menu.Item>
          <Menu.Item key="practice">练习管理</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="mail" /><span>Navigtion Two</span></span>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(AppSiderMenu);