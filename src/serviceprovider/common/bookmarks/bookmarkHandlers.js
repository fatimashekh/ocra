import React from "react";
import { isEmpty } from "lodash";
import { components } from 'react-select';

export const getData = (data) => {
    let i = 0;
    let j = 1;
    let k = 2;
    let init = [];
    let init1 = [];
    let init2 = [];
    if(data.length > 4 ){
        const value = data.map((obj, l) => {
            if (l === i) {
                i = l + 3;
                init.push(obj)
            } else if (l === j) {
                j = l + 3;
                init1.push(obj)
            } else if (l === k) {
                k = l + 3;
                init2.push(obj)
            }
        });
        if(isEmpty(init) && isEmpty(init1) && isEmpty(init2))
            return [];
        return[init, init1, init2];
    }else {
        const _value = data.map((obj, l) => {
            if (l === i) {
                i = l + 2;
                init.push(obj)
            } else if (l === j) {
                j = l + 2;
                init1.push(obj)
            } 
        });
        if(isEmpty(init) && isEmpty(init1))
            return [];
        return[init, init1];
    }
            
};

export const customStyles = {
    control: base => ({
        ...base,
        minHeight: "35px",
        fontSize: "12px",
        marginBottom: "15px",
        borderColor: "#c0c0c0",
        borderRadius: 0,
    }),
    container: base => ({ ...base, width: "224px" }),
    menuPortal: base => ({ ...base, zIndex: 11 }),
    indicatorSeparator: base => ({display: "none"}),
    indicatorsContainer: base => ({...base, color: "#000"}),
    singleValue: base => ({ ...base, fontSize: "11px"}),
    option: base => ({ ...base, fontSize: "11px"}),
};

const CaretDownIcon = () => {
    return <i style={{ opacity: "1", color: "#828282", zIndex: 11, fontSize: "15px" }} className="fas fa-caret-down p-l-5" />;
};

export const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <CaretDownIcon />
        </components.DropdownIndicator>
    );
};

