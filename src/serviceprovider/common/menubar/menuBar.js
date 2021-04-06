import React, { useState, useEffect } from 'react';
import { Popover, Menu } from 'antd';
import { NavItem } from "react-bootstrap";
import 'antd/dist/antd.css';
import { getLocalStorage } from '../../../common/commonFunctions';
const { SubMenu } = Menu;

const MenuBar = ({ userId, roleId, addBookmark, navigationItem,
    actionGetNavigationItem, actionGetNavigationItemSuccess,
    actionAddNavigationBookmark, actionDeleteNavigationBookmark,
    history, actionGetnavigationId, actionGetnavigationTabId, actionMenuToggle }) => {
    const [visible, setVisible] = useState(false);
    const [menuList, setMenuItems] = useState([]);
    const [selectedkeys, setSelectedkeys] = useState([]);
    const [boomarkIcon, setBoomarkIcon] = useState(false);
    useEffect(() => {
        setMenusValues(navigationItem);
    }, [visible, navigationItem]);

    const setMenusValues = (value) => {
        setMenuItems(value);
    }

    // View data on page load
    const handleVisibleChange = visible => {
        if (!visible) {
            setSelectedkeys([]);
        }
        if (userId && roleId) {
            // actionGetNavigationItem({ userId, roleId }).then(res => {
            //     if (res.payload && res.payload.data  && res.payload.data.status === 200) {
            //         actionGetNavigationItemSuccess(res.payload.data.resourceData);
            //     }
            // })
            setVisible(visible);
        }
        actionMenuToggle(visible)
    };

    /** Add & Delete  Bookmark */
    const handleAddBookmark = (id, key, mark, routeItemId, event) => {
        event.preventDefault();
        event.stopPropagation();
        setBoomarkIcon(true)
        let data = {
            roleId: roleId,
            userId: userId,
            itemId: id,
            routeItemId: routeItemId
        };
        if (key == "add") {
            actionAddNavigationBookmark(data)
                .then((result, error) => {
                    if (error) return;
                    if (result.payload.data.status == 200) {
                        // Get Navigation Item
                        actionGetNavigationItem({ userId, roleId }).then(res => {
                            if (res.payload.data.status === 200) {
                                setMenuItems(res.payload.data.resourceData);
                                actionGetNavigationItemSuccess(res.payload.data.resourceData);
                                setBoomarkIcon(false)
                            }
                        })
                    }
                }).catch(e => setBoomarkIcon(false));

        } else {
            actionDeleteNavigationBookmark(data)
                .then((result, error) => {
                    if (error) return;
                    if (result.payload.data.status == 200) {

                        // Get Navigation Item
                        actionGetNavigationItem({ userId, roleId }).then(res => {
                            if (res.payload.data.status === 200) {
                                setMenuItems(res.payload.data.resourceData);
                                actionGetNavigationItemSuccess(res.payload.data.resourceData);
                                setBoomarkIcon(false)
                            }
                        })
                    }
                }).catch(e => setBoomarkIcon(false));
        }
    }

    // Recursive function for nth child
    const renderData = (data, idx, enable, id) => {
        if (!data) return false;
        let elementValue = (
            data.map((item, index) => {
                return (
                    item.enabled ?
                        <SubMenu
                            key={item.id}
                            onMouseEnter={() => open(item.id)}
                            className={item.bookMarked ? "BookMarkShow" : "submenu-childd"}
                            title={
                                <div className="flex align-center justify-space-between title--wrap">
                                    <span className="page-title"
                                        onDoubleClick={() => handleNavigation(item.routeURL, item.id, item.approvalTabKey)}
                                        onClick={() => handleNavigation(item.routeURL, item.id, item.approvalTabKey)}>
                                        {item.name}
                                    </span>
                                    {item.bookMarked ?
                                        <span onClick={(e) => handleAddBookmark(item.id, "delete", item.bookMarked, "", e)}
                                            className={boomarkIcon ? "bookicon p-e-none b-active" : "bookicon b-active"}
                                        >
                                            <i class="fas fa-bookmark"></i>
                                        </span> : <span onClick={(e) => handleAddBookmark(item.id, "add", item.bookMarked, item.routedChildId, e)}
                                            className={boomarkIcon ? "bookicon p-e-none" : "bookicon"}
                                        >
                                            <i class="fas fa-bookmark"></i>
                                        </span>}
                                </div>
                            }
                        >
                            {renderData(item.children, index, item.enabled, item.id)}
                        </SubMenu> :

                        < Menu.Item key={item.id}
                            className={item.bookMarked ? "BookMarkShow" : "submenu-childd lastmenu-child"}
                            onMouseEnter={() => open(item.id)}
                        >
                            <div className="flex align-center justify-space-between title--wrap">
                                <span className="page-title"
                                    onDoubleClick={() => handleNavigation(item.routeURL, item.id, item.approvalTabKey)}
                                    onClick={() => handleNavigation(item.routeURL, item.id, item.approvalTabKey)}>
                                    {item.name}
                                </span>
                                {item.bookMarked ?
                                    <span onClick={(e) => handleAddBookmark(item.id, "delete", item.bookMarked, "", e)}
                                        className={boomarkIcon ? "bookicon p-e-none b-active" : "bookicon b-active"}>
                                        <i class="fas fa-bookmark"></i>
                                    </span> : <span onClick={(e) => handleAddBookmark(item.id, "add", item.bookMarked, item.routedChildId, e)}
                                        className={boomarkIcon ? "bookicon p-e-none" : "bookicon"}>
                                        <i class="fas fa-bookmark"></i>
                                    </span>}
                            </div>
                        </Menu.Item >
                )
            }
            )
        );
        return elementValue;
    }

    const handleNavigation = (URL, id, approvalTabKey) => {
        if (URL) history.push('/' + URL);
        if (id) actionGetnavigationId(id);
        if (approvalTabKey) actionGetnavigationTabId(approvalTabKey);
        setMenuItems([]);
        document.getElementById("icon-menu").click();
        actionMenuToggle(false)
        document.body.classList.remove('sideDrawerClose');
        document.body.classList.add('sideDrawerOpen');
    }

    // Open menu On hover
    const open = (key) => {
        // Add dynamic height for 2nd level menu height
        let getHeight = document.getElementsByClassName('menubar');
        let dynamicHeight = getHeight && getHeight[0] && getHeight[0].clientHeight;
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".ant-menu-submenu-popup ul { height: " + dynamicHeight + "px !important }";
        document.body.appendChild(css);

        let allKey = parentsOf(menuList, key, []);
        setSelectedkeys(allKey);
    }

    const close = (key) => {
        setSelectedkeys([]);
    }
    /*added for css requirement*/
    const handleLayout = () => {
        let windowPath = ''
        document.body.classList.remove('sideDrawerOpen');
        document.body.classList.remove('sideDrawerClose');
        if (window.location.pathname)
            windowPath = window.location.pathname.split("/").pop();
        if (getLocalStorage('navigationId') && windowPath !== 'dashboard' && windowPath !== 'administrator')
            document.body.classList.add('sideDrawerClose');
    }
    const parentsOf = (arr, id, parents) => {
        if (parents && parents.length)
            return parents;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                //push the current element at the front of the parents array
                parents.unshift(arr[i].id);
                return parents;
            };
            if (arr[i].children) {
                parents = parentsOf(arr[i].children, id, parents);
                // if the parents array has any elements in it it means we found the child
                if (parents.length) {
                    parents.unshift(arr[i].id);
                    return parents;
                }
            }
        }
        return parents;
    }

    const content = () => {
        return (
            <div className="menubar">
                {menuList && menuList.length > 0 && menuList.map((item, index) => {
                    return (
                        item.enabled && item.children && item.children.length > 0 ?
                            <Menu mode="vertical"
                                placement="topRight"
                                defaultOpenKeys={selectedkeys}
                                className="firstmenu"
                                defaultSelectedKeys={selectedkeys}
                                subMenuCloseDelay={0.1}
                                subMenuOpenDelay={0.2}
                            >
                                <SubMenu
                                    className={item.enabled ? '' : "child-noarrow"}
                                    key={item.id}
                                    onMouseEnter={item.enabled ? () => open(item.id) : () => close(item.id)}
                                    title={
                                        item.routeURL && item.routeURL !== undefined ?
                                            <span
                                                onDoubleClick={() => handleNavigation(item.routeURL, 'level1')}
                                                onClick={() => handleNavigation(item.routeURL, 'level1')} >{item.name}</span> :
                                            item.name
                                    }
                                >
                                    {renderData(item.children, index, item.enabled, item.id)}
                                </SubMenu>
                            </Menu> :
                            <Menu mode="vertical"
                                placement="topRight"
                                openKeys={selectedkeys}
                                className="firstmenu"
                            >
                                <SubMenu
                                    className="child-noarrow"
                                    key={item.id}
                                    title={
                                        item.routeURL && item.routeURL !== undefined ?
                                            <span
                                                onDoubleClick={() => handleNavigation(item.routeURL, 'level1')}
                                                onClick={() => handleNavigation(item.routeURL, 'level1')} >{item.name}</span> :
                                            item.name
                                    }
                                >
                                </SubMenu>
                            </Menu>
                    )
                }
                )}

            </div>)
    }

    return (
        <Popover
            content={content}
            placement="bottomLeft"
            trigger="click"
            visible={visible}
            getPopupContainer={trigger => trigger.parentNode}
            onVisibleChange={handleVisibleChange}
            overlayClassName="popup-set"
        >
            <NavItem onClick={handleLayout}>
                <span id="icon-menu" class="icon-menu mr-10"></span>
                Menu
            </NavItem>
        </Popover>
    );
}

export default MenuBar;