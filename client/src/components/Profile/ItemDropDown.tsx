import React, { Component } from 'react';
import { RouteComponentProps, RouteProps } from "react-router-dom";

interface ItemDropDownProps extends RouteProps {
    id: string;
    name: string;
    onDelete: Function;
    onUpdate: Function;
}

class ItemDropDown extends Component<ItemDropDownProps> {

    state = {
    }

    onDelete = () => {
        if(!window.confirm('Are you sure?')){
            return;
        }
        this.props.onDelete();
    }

    onUpdate = () => {
        this.props.onUpdate();
    }

    render() {
        return (
            <div>
                <button onClick = {this.onUpdate}>Update</button>
                <button onClick = {this.onDelete}>Delete</button>
            </div>
        );
    }
}

export default ItemDropDown;