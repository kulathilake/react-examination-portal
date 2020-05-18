import React, { useState } from 'react';
import {Button, Menu, Dropdown, Spin, Avatar } from 'antd';
import {withFirebase} from '../../firebase';
import {GoogleOutlined,  LoginOutlined,  UserOutlined} from '@ant-design/icons';
import Logo from '../../assets/images/favicon-32x32.png'
export default function Header({firebase}){

    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);


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
            window.location.replace("/")
        })
    }

    const usermenu = (
        <Menu mode="inline">
            <Menu.Item> <a  href="#/app/profile"><UserOutlined/> Profile</a></Menu.Item>
            <Menu.Item onClick = {()=>handleSignOut()}><LoginOutlined/>Logout</Menu.Item>
        </Menu>
    )

    return <Menu mode="horizontal" overflowedIndicator={<UserOutlined/>} >
        <Menu.Item onClick={()=>{window.location.replace("/")}}><img src={Logo} alt="ActuatorXMS" 
        style={{marginRight:"10px"}}/><strong>Actuator XMS</strong></Menu.Item>
        <Menu.Item>Help & Support</Menu.Item>
        <Menu.Item style={{float:'right'}} >
            {loading?<Spin/>:user?
                <Dropdown  overlay={usermenu}>
                        <a  href="#/app"><Avatar src={user.photoURL}/> {user.displayName}</a>
                </Dropdown>
            :
            <Button onClick={()=>handleSignIn()}><GoogleOutlined/>Sign In With Google</Button>
            }
        </Menu.Item>
    </Menu>
}


const HeaderWrapped = withFirebase(Header)
export {HeaderWrapped}