import React, { Component } from 'react';
import _, { forEach } from 'lodash';
import { connect, Provider } from 'react-redux';
import { RootState } from '../../store';
import { RouteComponentProps } from "react-router-dom";
import { fetchProfiles, editProfile, addProfile } from '../../actions/profileAction';
import { logout } from '../../actions/authActions';
import ProfileItem from './ProfileItem';

export interface ProfileProps extends RouteComponentProps {
    isAuth: boolean;
    history: any;
    logout: () => any;
}

interface profile {
    id: string,
    name: string,
};

class Profile extends Component<ProfileProps> {

    state = {
        items: [
        ],
        t_name: '',
        t_id: '',
        test: '',
        temp_name: '',
    }

    componentDidMount(): void {
        var fetchPromise = fetchProfiles();
        fetchPromise.then(items => {
            this.setState({ items: items });
        })
        .catch(err => {
            console.log(err);
        })

    }

    componentWillReceiveProps(newProps: ProfileProps): void {
        if(!newProps.isAuth) {
            this.props.history.push('/login');
        }
        var fetchPromise = fetchProfiles();
        fetchPromise.then(items => {
            this.setState({ items: items });
        })
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onDropdown = (id: string) => {
        // var items = state.items;
        // for(var i = 0 ; i < items.length ; i ++){
        //   if(items[i].id == id)
        //     items[i].drop = true;
        // }
        // this.setState({...mystate, items});
    }

    onDelete = (pid: string) => {
        var items = this.state.items;
        items = items.filter(({id, name}) => {
            console.log(id);
            return id != pid;
        });
        console.log(items);
        this.setState({items : items});
    }

    onUpdate = (pid: string, pname: string) => {
        this.setState({t_id : pid, t_name : pname});
    }

    onOK = () => {
        var editProfilePromise = editProfile(this.state.t_id, this.state.t_name);
        editProfilePromise.then((res) => {
            if(res){
                var items: profile[] = this.state.items;
                for(var i = 0 ; i < items.length ; i ++){
                    if(items[i].id == this.state.t_id){
                        items[i].name = this.state.t_name;
                    }
                }
                this.setState({ items : items });
            }
            this.setState({t_id : ''});
        })
    }

    onAdd = () => {
        var addProfilePromise = addProfile(this.state.t_name);
        addProfilePromise.then(res => {
            if(res) {
                console.log(res);
                var items: profile[] = this.state.items;
                items.push({id:res, name:this.state.t_name});
                this.setState({items : items});
            }
        })        
    }

    render() {
        return (
            <div className = "container">
                <button onClick={this.props.logout}> Sign out</button>
                <h1>Items List</h1>
                <input type="checkbox" /> Select All<br />
                <table>
                    <thead>
                        <tr className = "row">
                            <th  className = "col-25"></th>
                            <th className = "col-25">Id</th>
                            <th className = "col-25">name</th>
                        </tr>
                    </thead>
                    <tbody className = "row">
                        {this.state.items.map((item:profile) => (
                                <ProfileItem
                                key= {item.id}
                                id = {item.id}
                                name = {item.name}
                                onDelete = {this.onDelete}
                                onUpdate = {this.onUpdate}
                               />
                        ))}
                        
                    </tbody>
                </table>
                <div className = "row">
                    <br/>
                    <h1>Add/Update Item</h1>
                    <div className = "col-75">
                        <input type = "text" value = {this.state.t_name} name = "t_name" onChange = {this.onChange}/>
                    </div>
                    <button className = "col-25" onClick = {this.onOK}>OK</button>
                    <br/>
                </div>
                <br/>
                <button onClick = {this.onAdd} className = "addButton">Add Item</button>
                <button>Delete selected Item</button>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isAuth: state.auth.isAuth
    };
};

export default connect(
    mapStateToProps,
    { logout }
)(Profile);
