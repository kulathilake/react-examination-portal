import React, { useState } from 'react';
import {Button, Menu, Dropdown, Spin, Avatar, notification } from 'antd';
import {withFirebase} from '../../firebase';
import {GoogleOutlined,  LoginOutlined,  UserOutlined} from '@ant-design/icons';
import Logo from '../../assets/images/favicon-32x32.png'
import { Link, useHistory } from 'react-router-dom';
export default function Header({firebase}){

    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const history = useHistory()

    firebase.auth.onAuthStateChanged(user=>{
        setLoading(false)
        if(user){
            setUser(user)
        }
        else{
            setUser(null)
        }
    })

    const handleSignIn = () => {
        setLoading(true)
        firebase.signInWithRedirect()
    }

    const handleSignOut = () => {
        setLoading(true)
        firebase.signOut().then(()=>{
            notification.info({
                message:"You have Signed out."
            })
            history.push("/")
        })
    }

    const usermenu = (
        <Menu mode="inline">
            <Menu.Item> <a  href="#/app/profile"><UserOutlined/> Profile</a></Menu.Item>
            <Menu.Item onClick = {()=>handleSignOut()}><LoginOutlined/>Logout</Menu.Item>
        </Menu>
        
    )      
    return <Menu 
    
        mode="horizontal" overflowedIndicator={<UserOutlined/>} >
        
        <Menu.Item ><Link to="/"></Link><img src={Logo} alt="ActuatorXMS" 
        style={{marginRight:"10px"}}/><strong>Actuator XMS</strong></Menu.Item>
        <Menu.Item>Help & Support</Menu.Item>
    
        <Menu.Item style={{float:'right'}} >
            {loading?<Spin/>:user&&!user.isAnonymous?
                <Dropdown  overlay={usermenu}>
                        <a  href="#/app"><Avatar src={user.photoURL}/> {user.displayName}</a>
                </Dropdown>
            :
            !user?.isAnonymous&&<Button onClick={()=>handleSignIn()}><GoogleOutlined/>Sign In With Google</Button>
            }
        </Menu.Item>
    </Menu>
}


const HeaderWrapped = withFirebase(Header)
export {HeaderWrapped}