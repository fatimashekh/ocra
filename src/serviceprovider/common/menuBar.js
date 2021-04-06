import React, { useState, useEffect, useReducer } from 'react';
import Select, { components } from 'react-select';
import { Popover, Tooltip, Menu, Icon } from 'antd';
import Sprite from '../../img/sprite.svg';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Row, Col, NavItem } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import 'antd/dist/antd.css';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const MenuBar = (props) => {

    const { menuItem } = props;
    const [visible, setVisible] = useState(false);
    const [menuList, setMenuItems] = useState([]);
    useEffect(() => {
        return () => {
            setMenuItems(menuItem);
        }
    }, [visible, menuItem])

    const handleVisibleChange = visible => {
        setVisible(visible);
    };

    const renderData = (data, idx, enable) => {
        if (!data) return false;
        let elementValue = (
            data.map((item, index) => {
                return (
                    item.enabled ?
                        <SubMenu
                            key={item.id}
                            className={item.bookMarked && item.bookMarked !== undefined ? "BookMarkShow" : "submenu-childd"}
                            // title={item.name}
                            title={
                                item.routeURL && item.routeURL !== undefined ?
                                    <div className="flex align-center justify-space-between">

                                        <span className="page-title" onClick={() => handleNavigation(item.routeURL, item.id)}>
                                            {item.name}
                                            {/* <Link to={item.routeURL}>{item.name} </Link> */}
                                        </span>
                                        {item.bookMarked && item.bookMarked !== undefined ?
                                            <span onClick={() => handleAddBokkmark(item.id, "delete")}
                                                className="bookicon">
                                                <i class="fas fa-bookmark"></i>
                                            </span> : <span onClick={() => handleAddBokkmark(item.id, "add")}
                                                className="bookicon">
                                                <i class="fas fa-bookmark"></i>
                                            </span>}

                                    </div> :
                                    <div className="flex align-center justify-space-between"><span className="page-title">{item.name}</span>

                                        {item.bookMarked && item.bookMarked !== undefined ?
                                            <span onClick={() => handleAddBokkmark(item.id, "delete")}
                                                className="bookicon">
                                                <i class="fas fa-bookmark"></i>
                                            </span> : <span onClick={() => handleAddBokkmark(item.id, "add")}
                                                className="bookicon">
                                                <i class="fas fa-bookmark"></i>
                                            </span>}

                                    </div>
                            }
                        // <Link to={"/" + item.routeURL}>
                        //     <span>{item.name}</span>
                        // </Link>
                        // }
                        // onClick={() => handleAddBokkmark(item.routeURL)}
                        //onClick={handleAddBokkmark(item.routeURL)}
                        >
                            {renderData(item.children, index, item.enabled)}
                        </SubMenu> :

                        < Menu.Item key={index} className={item.bookMarked && item.bookMarked !== undefined ? "BookMarkShow" : "submenu-childd"}>
                            {item.routeURL && item.routeURL !== undefined ?
                                <div className="flex align-center justify-space-between">
                                    <span className="page-title" onClick={() => handleNavigation(item.routeURL, item.id)}>
                                        {item.name}
                                        {/* <Link to={item.routeURL}>{item.name} </Link> */}
                                    </span>
                                    {/* <span className="page-title">
                                        <Link to={item.routeURL}>{item.name}</Link>
                                    </span> */}

                                    {item.bookMarked && item.bookMarked !== undefined ?
                                        <span onClick={() => handleAddBokkmark(item.id, "delete")}
                                            className="bookicon">
                                            <i class="fas fa-bookmark"></i>
                                        </span> : <span onClick={() => handleAddBokkmark(item.id, "add")}
                                            className="bookicon">
                                            <i class="fas fa-bookmark"></i>
                                        </span>}

                                </div> :
                                <div className="flex align-center justify-space-between">
                                    <span className="page-title">{item.name}</span>

                                    {item.bookMarked && item.bookMarked !== undefined ?
                                        <span onClick={() => handleAddBokkmark(item.id, "delete")}
                                            className="bookicon">
                                            <i class="fas fa-bookmark"></i>
                                        </span> : <span onClick={() => handleAddBokkmark(item.id, "add")}
                                            className="bookicon">
                                            <i class="fas fa-bookmark"></i>
                                        </span>}

                                </div>
                            }

                        </Menu.Item >
                )
            }
            )
        );
        return elementValue;
    }

    const handleAddBokkmark = (id, action) => {
        if (action == "add") {
            props.addBookmark(id);
        } else {
            props.deleteBookmark(id);
        }
    }

    const handleNavigation = (URL, id) => {
        if (URL) props.history.push('/' + URL);
        if (id) props.getNavigationId(id);
    }

    const content = () => {
        return (
            <div className="menubar">
                {menuList && menuList.length > 0 && menuList.map((item, index) => {
                    return (
                        <Menu mode="vertical" >
                            <SubMenu
                                className={item.enabled ? '' : "child-noarrow"}
                                key={index}
                                // title={item.name}
                                title={
                                    item.routeURL && item.routeURL !== undefined ? <Link to={item.routeURL}>{item.name}</Link> : item.name}
                            //     <Link to={"/" + item.routeURL}>
                            //         <span>{item.name}</span>
                            //     </Link>
                            // }
                            // onClick={() => handleAddBokkmark(item.routeURL)}
                            // onClick={handleAddBokkmark(item.routeURL)}
                            >
                                {renderData(item.children, index, item.enabled)}
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

            <NavItem>
                <span class="icon-menu mr-10"></span>
                Menu
            </NavItem>
        </Popover>
    );
}

export default MenuBar;

