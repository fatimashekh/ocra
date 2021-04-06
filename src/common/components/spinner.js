import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined />;

export default function Spinner(props, { align }) {
    return <div className={align ? "set-spiner-center" : "set-spiner"}><Spin className="" indicator={antIcon} size="large" tip={props.tip}/></div>;
}

