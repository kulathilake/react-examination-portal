import React from 'react';
import ProfilePage from '../../pages/profile/ProfilePage';
import { notification } from 'antd';


export default class ProfileComponent extends React.Component{
    constructor({firebase}){
        super();
        this.firebase = firebase
        this.user = firebase.getUser()
        this.state={
        
        }
    }

    componentDidMount(){

    }

    deleteUser(){
        this.firebase.deleteUserAccount().then(res=>{
            notification.info({
                message:"Your Account has been Deleted. Your data is queued for deletion."})
        })
    }

    render(){
        return <ProfilePage 
        user={this.user} 
        credits={null}
        deleteUser={this.deleteUser.bind(this)}
        />
    }
}