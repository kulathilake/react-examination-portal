import React, { useState } from 'react';
import {Button, Menu, Dropdown, Spin } from 'antd';
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
        <Menu>
            <Menu.Item><UserOutlined/>Profile</Menu.Item>
            <Menu.Item onClick = {()=>handleSignOut()}><LoginOutlined/>Logout</Menu.Item>
        </Menu>
    )

    return <Menu mode="horizontal" >
        <Menu.Item><img src={Logo}/></Menu.Item>
        <Menu.Item onClick={()=>{window.location.replace("/")}}><strong>Actuator XMS</strong></Menu.Item>
        <Menu.Item>Help & Support</Menu.Item>
        <Menu.Item style={{float:'right'}}>
            {loading?<Spin/>:user?
                <Dropdown overlay={usermenu}>
                        <a  href="#/app">{user.displayName}</a>
                </Dropdown>
            :
            <Button onClick={()=>handleSignIn()}><GoogleOutlined/>Sign In With Google</Button>
            }
        </Menu.Item>
    </Menu>
}


const HeaderWrapped = withFirebase(Header)
export {HeaderWrapped}