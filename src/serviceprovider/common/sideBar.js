import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import {
  actionUserLogout,
  actionGetnavigationId,
  actionGetnavigationTabId,
  actionBlankNavigation
} from '../../common/core/redux/actions';
import 'antd/dist/antd.css';
import { getLocalStorage } from '../../common/commonFunctions';
import { Menu } from 'antd';
import animate from 'css-animation';

const animation = {
  enter(node, done) {
    let height;
    return animate(node, 'rc-menu-collapse', {
      start() {
        height = node.offsetHeight;
        node.style.height = 0;
      },
      active() {
        node.style.height = `${height}px`;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },

  appear() {
    return this.enter.apply(this, arguments);
  },

  leave(node, done) {
    return animate(node, 'rc-menu-collapse', {
      start() {
        node.style.height = `${node.offsetHeight}px`;
      },
      active() {
        node.style.height = 0;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },
};

class SideBar extends Component {
  constructor(props) {
    super(props);
    let windowPath = ''
    if (window.location.pathname)
      windowPath = window.location.pathname.split("/").pop();
    this.state = {
      windowPath: windowPath,
      selectedMenu: '',
      navigationItem: props.navigationItem,
      defaultSelectedItem: '',
      defaultSelectedKeys: [],
      openKeys: [],
      allKey: [],
      selectedKeys: []
    };
  }

  /*Get all navigation list*/
  componentDidMount() {
    this.handleSidebarSelection();
  }

  handleSidebarSelection = (tabKey, menuOpen) => {
    let navigationItem = getLocalStorage('navigationItem') ? getLocalStorage('navigationItem') : [];
    tabKey = tabKey ? tabKey : getLocalStorage('navigationTabId');
    let selectedMenu = getLocalStorage('navigationId') ? getLocalStorage('navigationId') : '';
    let windowPath = this.state.windowPath
    let processed = []; let elemData = []; let selectedIds = [];
    let obj = []; let navElement = { children: [], name: '' };
    var searchnavigationId = '';
    if (selectedMenu === 'level1' || windowPath === 'dashboard' || windowPath === 'administrator') {
      selectedIds = [];
      this.blankNavigation()
    } else {
      if (this.props.userInfo.userData.isAdmin) {
        if (selectedMenu && (windowPath === 'directPurchasingApproval' ||
          windowPath === 'indirectPurchasingApproval') && selectedMenu) {
          var searchnavigationId = this.searchRecursive(navigationItem, tabKey, windowPath);
          if (searchnavigationId && searchnavigationId !== undefined)
            selectedMenu = searchnavigationId && searchnavigationId.id ?
              searchnavigationId.id : selectedMenu;
        }
        selectedIds = this.parentsOf(navigationItem, selectedMenu, []);
      } else
        selectedIds = this.parentsOf(navigationItem, selectedMenu, []);
    }
    if (!isEmpty(selectedIds)) {
      /*added for css requirement*/
      if (menuOpen) {

      } else {
        document.body.classList.remove('sideDrawerClose');
        document.body.classList.add('sideDrawerOpen');
      }


      obj = navigationItem.filter(obj => obj.id === selectedIds[0]);
      if (obj && obj.length > 0) {
        elemData = obj[0].children.filter(elem => elem.id === selectedIds[1]);
        if (elemData && elemData.length > 0) {
          navElement = elemData[0];
        };
      }

      this.setState({
        navigationItem: navElement.children,
        defaultSelectedItem: navElement.name,
        openKeys: JSON.parse(JSON.stringify(selectedIds)),
        navigationId: getLocalStorage('navigationId'),
        selectedMenu: selectedMenu,
        selectedKeys: JSON.parse(JSON.stringify(selectedIds))
      });
    } else {
      /*added for css requirement*/
      document.body.classList.remove('sideDrawerOpen');
      document.body.classList.remove('sideDrawerClose');
    }
  }

  /*Get all navigation list*/
  componentWillReceiveProps(next) {
    let windowPath = this.state.windowPath
    let navigationTabId = next.navigationTabId ?
      next.navigationTabId : '';
    let menuOpen = next.menuOpen ?
      next.menuOpen : '';
    let navigationId = next.navigationId ?
      next.navigationId : '';
    if (navigationTabId) {
      this.handleSidebarSelection(navigationTabId, menuOpen)
    }
    else if (navigationId && navigationId !== 'level1' && windowPath !== 'dashboard'
      && windowPath !== 'administrator') {
      this.setState({
        selectedMenu: navigationId
      })
    } else if (navigationId == 'level1' || windowPath == 'dashboard'
      || windowPath == 'administrator') {
      document.body.classList.remove('sideDrawerOpen');
      document.body.classList.remove('sideDrawerClose');
    }
  }
  blankNavigation =()=>
  {
    localStorage.setItem('navigationTabId', '');
    localStorage.setItem('navigationId', '');
    localStorage.setItem('navigationItem', []);
  }
  /*Get URL in recursive*/
  searchRecursive(data, id, windowPath) {
    let found = data.find(d => d.approvalTabKey === id && d.routeURL === windowPath);
    if (!found) {
      let i = 0;
      while (!found && i < data.length) {
        if (data[i].children && data[i].children.length) {
          found = this.searchRecursive(data[i].children, id, windowPath);
        }
        i++;
      }
    }
    return found;
  }
  /*Rrecursive Function*/
  renderData(data, idx, enable) {
    let selectedMenu = this.state.selectedMenu;
    if (!data) return false;
    let elementValue = (
      data.map((item, index) => {
        return (
          item.enabled ?
            <Menu.SubMenu key={item.id}
              onClick={(e) => this.open(e, item.id)}
              title={item.name}>
              {this.renderData(item.children, index, item.enabled)}
            </Menu.SubMenu> :
            <Menu.Item key={item.id} className={selectedMenu === item.id ? "selectOpenItem" : ""}
              onClick={(e) => this.handleNavigation(item.routeURL, item.id, item.approvalTabKey)} title={item.name}>{item.name}</Menu.Item>
        )
      }
      )
    );
    return elementValue;
  }

  open = (e, key) => {
    let allKey = this.parentsOf(this.state.navigationItem, key, []);
    this.setState({ openKeys: allKey });
  }

  close = (e, key) => {
    this.setState({ openKeys: [] });
  }

  /*Get All parent id's*/
  parentsOf = (arr, id, parents) => {
    if (parents && parents.length)
      return parents;
    // I use for(;;) instead of map() because I need the return to exit the loop
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        //push the current element at the front of the parents array
        parents.unshift(arr[i].id);
        return parents;
      };
      if (arr[i].children) {
        parents = this.parentsOf(arr[i].children, id, parents);
        // if the parents array has any elements in it it means we found the child
        if (parents.length) {
          parents.unshift(arr[i].id);
          return parents;
        }
      }
    }
    return parents;
  }

  toggle = () => {
    document.body.classList.toggle('sideDrawerOpen');
    document.body.classList.toggle('sideDrawerClose');
  }

  handleNavigation = (URL, id, approvalTabKey) => {
    if (id) this.props.actionGetnavigationId(id);
    if (approvalTabKey) this.props.actionGetnavigationTabId(approvalTabKey);
    this.open(this, id);
    let allKey = this.parentsOf(this.state.navigationItem, id, []);
    this.setState({
      selectedMenu: id,
      selectedKeys: allKey,
      openKeys: allKey
    });
    if (URL && this.props && this.props.history) this.props.history.push('/' + URL);
  }

  render() {
    const navigationItem = this.state.navigationItem ? this.state.navigationItem : []
    let selectedMenu = this.state.selectedMenu;
    let defaultSelectedItem = this.state.defaultSelectedItem;
    return (this.state.selectedMenu && this.state.openKeys && this.state.openKeys.length > 0 ? (
      <aside id="sidebar" className="sidebar">
        <div className="aside-head">
          <button className="toggler-sidebar" onClick={this.toggle}><span className="icon-less_than"></span></button>
        </div>
        <div className="sidebar-inner">
          <h5 className="sb-title">{defaultSelectedItem}</h5>
          {navigationItem && navigationItem.map((item, index) => {
            return (
              <Menu
                defaultSelectedKeys={this.state.openKeys}
                defaultOpenKeys={this.state.openKeys}
                mode="inline"
                inlineCollapsed={this.state.collapsed}
                multiple={false}
                openAnimation={animation}
              >
                {item.enabled ?
                  <Menu.SubMenu key={item.id} onClick={(e) => this.open(e, item.id)} title={item.name}>
                    {this.renderData(item.children, index, item.enabled)}
                  </Menu.SubMenu>
                  :
                  <Menu.Item key={item.id} onClick={(e) => this.handleNavigation(item.routeURL, item.id, item.approvalTabKey)}
                    className={selectedMenu === item.id ? "selectOpenItem" : ""} title={item.name}>
                    {item.name}</Menu.Item>
                }
              </Menu>
            )
          }
          )}
        </div>
      </aside>) : ''
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionUserLogout, actionGetnavigationId, actionGetnavigationTabId,
      actionBlankNavigation
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.User,
    // navigationItem: state.User.navigationItem,
    navigationItem: state.BuyerData.navigationItem,
    navigationId: state.BuyerData.navigationId,
    navigationTabId: state.BuyerData.navigationTabId,
    menuOpen: state.BuyerData.menuOpen,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);


