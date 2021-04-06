import React, { useState, useEffect, useReducer } from 'react';
import { Popover, Tooltip } from 'antd';
import { NavItem, FormGroup, FormControl } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Spinner from "../../../common/components/spinner";
import { isEmpty } from "lodash";
import { getData } from "./bookmarkHandlers"
import { getLocalStorage } from '../../../common/commonFunctions';
import BookmarkIcon from "../../../img/bookmaricon.svg"
const MENU_FILTER = "MENU_FILTER";
const LOADER = "LOADER";

const Bookmark = ({ menuFilter, bookmark, actionGetFilterBookmark, actionGetFilterBookmarkSuccess, userId, roleId, history,
    actionGetBookmark, actionGetBookmarkSuccess, actionGetChangeBookmark, actionGetChangeBookmarkSuccess,
    actionGetnavigationId, actionPersistSelection, selectedOpt, actionGetnavigationTabId }) => {

    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(true);
    const [bookmarksData, setBookmarksData] = useState([])
    const [bookmarks, setBookmarks] = useState([]);
    const [tempBookmarks, setTempBookmarks] = useState([]);
    const [show, setShow] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [option, setOption] = useState(selectedOpt === "" ? "All" : selectedOpt);
    const [dragId, setDragId] = useState("");

    useEffect(() => {
        dispatch({ type: MENU_FILTER, data: menuFilter });
        setBookmarksValues(bookmark);
        if (isEmpty(bookmark))
            setEdit(true);
    }, [menuFilter, bookmark]);

    const setBookmarksValues = (value) => {
        setBookmarksData(value);
        setBookmarks(getData(value));
        setTempBookmarks(getData(value));
    }

    const handleVisibleChange = visible => {
        if (!visible) {
            setEdit(true);
            actionGetBookmark({ userId, roleId }).then(res => {
                if (res.payload && res.payload.data && res.payload.data.status === 200)
                    actionGetBookmarkSuccess(res.payload.data.resourceData);
            });
            actionPersistSelection(option);
        } else {
            dispatch({ type: LOADER, data: true });
            if (selectedOpt.toLowerCase() === "all" || selectedOpt === "") {
                actionGetBookmark({ userId, roleId }).then(res => {
                    if (res.payload.data.status === 200)
                        actionGetBookmarkSuccess(res.payload.data.resourceData);
                    dispatch({ type: LOADER, data: false });
                });
            } else {
                actionGetFilterBookmark({ userId, roleId, itemId: selectedOpt }).then(res => {
                    if (res.payload.data.status === 200)
                        actionGetFilterBookmarkSuccess(res.payload.data.resourceData);
                    dispatch({ type: LOADER, data: false });
                });
            }
        }
        setVisible(visible);
    };

    const removeItem = (item) => {
        let bookmarkFil = bookmarksData.filter(obj => obj.id !== item.id);
        setBookmarksValues(bookmarkFil);
    }

    const editAndSave = (flag) => {
        let itemId = option.toLowerCase() === "all" ? "" : option;
        if (flag) {
            let navigationMenuItemsId = [];
            bookmarksData.map((obj, i) => {
                let posObj = {};
                posObj.menuItemId = obj.id;
                posObj.position = i + 1;
                navigationMenuItemsId.push(posObj);
            });
            let postData = { userId, roleId, navigationMenuItemsId, itemId };
            dispatch({ type: LOADER, data: true });
            actionGetChangeBookmark(postData).then(res => {
                if (res.payload.data.status === 200) {
                    if (option.toLowerCase() === "all") {
                        actionGetBookmark({ userId, roleId }).then(res => {
                            if (res.payload.data.status === 200)
                                actionGetBookmarkSuccess(res.payload.data.resourceData);
                        });
                    } else {
                        actionGetFilterBookmark({ userId, roleId, itemId }).then(res => {
                            if (res.payload.data.status === 200)
                                actionGetFilterBookmarkSuccess(res.payload.data.resourceData)
                        });
                    }

                }
                dispatch({ type: LOADER, data: false });
            });
        }
        setEdit(flag);
    }

    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        setDragId("");
        if (!destination)
            return;
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
        const sPos = +source.index;
        const dPos = +destination.index;
        let srcId = bookmarks[sInd][sPos].id;
        let destId = bookmarks[dInd][dPos] && bookmarks[dInd][dPos].id;
        if (bookmarks[dInd][dPos]) {
            const newBmData = Object.assign([], bookmarksData);
            const srcBmData = newBmData.filter(val => val.id === srcId);
            const destBmData = newBmData.filter(val => val.id === destId);
            const srcBmInd = newBmData.findIndex(val => val.id === srcBmData[0].id)
            const destBmInd = newBmData.findIndex(val => val.id === destBmData[0].id)
            newBmData.splice(srcBmInd, 1);
            newBmData.splice(destBmInd, 0, srcBmData[0]);
            setBookmarksValues(newBmData);
        } else
            return;
    }

    const onDragStart = (result) => {
        setDragId(result.draggableId);
    }

    const showTooltip = (e, flag, id) => {
        if (flag && e.target.scrollWidth > e.target.offsetWidth)
            dispatch({ type: `${id}Flag`, data: true });
    }

    function getStyle(style, snapshot) {
        let _style = Object.assign({}, style, {
            transitionDuration: `0.001s`,
            border: "0.5px solid #1890ff",
            backgroundColor: "#1890ff",
            color: "#fff"
        });
        if (!snapshot.isDragging) return {};
        if (!snapshot.isDropAnimating)
            return _style;
        return _style;
    }

    const changeBookmarks = (opt) => {
        let postData = { userId, roleId, itemId: opt.target.value };
        dispatch({ type: LOADER, data: true });
        if (opt.target.value === "all") {
            actionGetBookmark({ userId, roleId }).then(res => {
                if (res.payload.data.status === 200)
                    actionGetBookmarkSuccess(res.payload.data.resourceData);
                dispatch({ type: LOADER, data: false });
            });
        } else {
            actionGetFilterBookmark(postData).then(res => {
                if (res.payload.data.status === 200)
                    actionGetFilterBookmarkSuccess(res.payload.data.resourceData)
                dispatch({ type: LOADER, data: false });
            });
        }
        setOption(opt.target.value);
    }

    const onDragEnable = (enableDrag) => {
        let drag = false;
        if (edit) drag = true;
        if (!enableDrag) drag = true;
        if (bookmarksData.length === 1) drag = true;
        return drag;
    }

    const navigateTo = (item) => {
        actionPersistSelection(option);
        if (item.pageRouting !== "") history.push('/' + item.pageRouting);
        if (item.id) actionGetnavigationId(item.id);
        if (item && item.approvalTabKey) actionGetnavigationTabId(item.approvalTabKey);
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
    const content = () => {
        let enableDrag = option.toLowerCase() !== "all" ? false : true;
        let disableEdit = isEmpty(bookmarks) ? true : false;
        return (
            <div className="bookmark-container">
                <p className="bookmark-title m-l-10">Bookmarks</p>
                <div className="flex justify-space-between m-l-10">
                    <span className="fil-title">Filter By</span>
                    <div className={`${disableEdit && edit ? "disable-edit" : ""}`}>
                        <span className={`fil-title-blue  ${disableEdit && edit ? "not-allow" : "cursor-pointer"}`}
                            onClick={() => editAndSave(!edit)}
                        >
                            {edit ? "Edit Bookmarks" : "Done"}
                        </span>
                    </div>
                </div>
                <div className="flex justify-space-between p-b-15 m-l-10">
                    <span>
                        <FormGroup controlId="formControlsSelect" className="m-b-0">
                            <FormControl
                                componentClass="select"
                                className="menu-arrow br-0"
                                name="menu"
                                value={option}
                                defaultValue={"All"}
                                onChange={(e) => changeBookmarks(e)}
                            >
                                {state.menuFilter &&
                                    state.menuFilter.map((item, index) => {
                                        return (
                                            <option value={item.value} key={index}>{item.label}</option>
                                        );
                                    })}
                            </FormControl>
                        </FormGroup>
                    </span>
                    {!edit && enableDrag && bookmarksData.length > 1 ? <span className="fil-title p-r-20 m-t-3">* Drag and Drop to rearrange Bookmarks</span> : null}
                </div>
                {!state.isRequest ?
                    <div className="flex justify-space-between m-l-10">
                        {isEmpty(tempBookmarks) ? <div className="no-data">No Bookmarks Found</div> :
                            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                                {tempBookmarks.map((el, ind) => (
                                    <Droppable key={ind} droppableId={`${ind}`}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {el.map((item, index) => (
                                                    <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={onDragEnable(enableDrag)}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className={`bm-container flex justify-space-between ${edit ? "cursor-pointer" : ""}`}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    key={item.id}
                                                                    style={getStyle(provided.draggableProps.style, snapshot)}
                                                                    onClick={edit ? () => navigateTo(item) : null}
                                                                >
                                                                    <span className="bm-icon">                                                                        
                                                                        <img  src={BookmarkIcon} />
                                                                        </span>
                                                                    <span className="bm-content">
                                                                        <p
                                                                            className="bm-main"
                                                                            style={dragId === item.id ? { color: "#fff" } : {}}
                                                                        >
                                                                            {item.menu}
                                                                        </p>
                                                                        <Tooltip
                                                                            arrowPointAtCenter={true}
                                                                            title={item.parent}
                                                                            visible={state[`${item.id}Flag`]}
                                                                        >
                                                                            <p
                                                                                className="bm-breadcrumb"
                                                                                onMouseEnter={(e) => showTooltip(e, true, item.id)}
                                                                                onMouseLeave={() => dispatch({ type: `${item.id}Flag`, data: false })}
                                                                                style={dragId === item.id ? { color: "#fff" } : {}}
                                                                            >
                                                                                {item.parent}
                                                                            </p>
                                                                        </Tooltip>
                                                                    </span>
                                                                    {!edit ? <span class={dragId !== item.id ? "icon-close cursor-pointer bm-cross" : ""} onClick={() => removeItem(item)}> </span> : null}
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                ))}
                                                <div style={{ display: "none" }}>
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>))}
                            </DragDropContext>}
                    </div> : <Spinner align={true} />}
            </div>
        )
    }

    return (
        <Popover
            content={content}
            placement="bottomLeft"
            trigger="click"
            visible={visible}
            getPopupContainer={trigger => trigger.parentNode}
            onVisibleChange={handleVisibleChange}
            overlayClassName="bm-overlay"
            overlayStyle={{ minWidth: bookmarksData.length > 4 ? "54%" : "38%" }}
        >
            <NavItem onClick={handleLayout}>
                <span class="icon-bookmark mr-10"></span>
                Bookmarks
            </NavItem>
        </Popover>
    );
}

export default Bookmark;

/* State Values - Bookmarks */
const initialState = { menuFilter: [], isRequest: false }

function reducer(state, action) {
    switch (action.type) {
        case "MENU_FILTER":
            return Object.assign({}, state, {
                menuFilter: action.data
            });

        case LOADER:
            return Object.assign({}, state, {
                isRequest: action.data
            });

        case action.type:
            return Object.assign({}, state, {
                [action.type]: action.data
            });

        default:
            return state
    }
}



