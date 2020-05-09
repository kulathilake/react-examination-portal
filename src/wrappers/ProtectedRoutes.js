import React, { useState, Fragment } from 'react'
import {withFirebase} from '../firebase';
import { Result,Spin, Breadcrumb } from 'antd';
import { useLocation } from 'react-router-dom';

function ProtectedRoutes({firebase,component:Component}){

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const location = useLocation()

    firebase.auth.onAuthStateChanged(user=>{
        if(user){
            setLoading(false)
            setUser(user)
        }
        else{
            setLoading(false)
            setUser(null)
        }
    })
    
    if(loading){
    return <Result icon={<Spin size="large"/>}/>
    }
    if(user){
        return (
        <Fragment>
            <Breadcrumb>
                {location.pathname.split("/").map((i,k)=>{
                    return (<Breadcrumb.Item key={k}>{String(i).charAt(0).toUpperCase()+String(i).substr(1)}</Breadcrumb.Item>)
                })}
            </Breadcrumb>
            <Component user={user} firebase={firebase}/>
        </Fragment>)
    }
    else{
        return <Result status="info" title="You Are Logged Out"/>
    }
}


const ProtectedRoutesWrapped =  withFirebase(ProtectedRoutes);

export default ProtectedRoutesWrapped;
export {ProtectedRoutes};