import React, { useState, Fragment } from 'react'
import {withFirebase} from '../firebase';
import { Result,Spin, Breadcrumb } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

function ProtectedRoutes({firebase,component:Component,props}){

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const location = useLocation()

    const params = useParams();

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
        <div >
            <Breadcrumb style={{marginBottom:"20px"}}>
                {location.pathname.split("/").map((i,k)=>{
                    return (<Breadcrumb.Item key={k}>{String(i).charAt(0).toUpperCase()+String(i).substr(1)}</Breadcrumb.Item>)
                })}
            </Breadcrumb>
            <Component params={params} user={user} firebase={firebase}/>
        </div>)
    }
    else{
        return <Result status="info" title="You Are Logged Out"/>
    }
}


const ProtectedRoutesWrapped =  withFirebase(ProtectedRoutes);

export default ProtectedRoutesWrapped;
export {ProtectedRoutes};