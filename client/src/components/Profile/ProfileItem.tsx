import React, { Component } from 'react';
import { RouteComponentProps, RouteProps } from "react-router-dom";
import ItemDropDown from './ItemDropDown';

interface ProfileItemProps extends RouteProps {
    id: string;
    name: string;
    onDelete: (id: string) => any;
    onUpdate: (id: string, name: string) => any;
}

class ProfileItem extends Component<ProfileItemProps> {

    state = {
        isDrop: false,
    }

    onDropClick = () => {
        this.setState({ isDrop: !this.state.isDrop });
    }

    onDelete = () => {
        this.props.onDelete(this.props.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.id, this.props.name);
        
    }

    render() {
        return (
                <tr>
                    <td className = "col-25"><input type = "checkbox" /></td>
                    <td className = "col-25">{this.props.id}</td>
                    <td className = "col-25">{this.props.name}</td>
                    <td className = "col-25"><button onClick={this.onDropClick}>Drop</button></td>
                    {this.state.isDrop ?
                        <ItemDropDown
                            id={this.props.id}
                            name={this.props.name}
                            onDelete = {this.onDelete}
                            onUpdate = {this.onUpdate} />
                        : ''}
                </tr>
        );
    }
}

export default ProfileItem;