import React, { useState } from 'react'
import {withFirebase} from '../firebase';
import { Result,Spin, Breadcrumb,Button } from 'antd';
import { useLocation, useParams, useHistory } from 'react-router-dom';

function ProtectedRoutes({firebase,component:Component,props}){

    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
    const location = useLocation()
    const history = useHistory();
    const params = useParams();

    const breadCrumbNavigate = (text) =>{
        let i = window.location.hash.split("/").indexOf(text)
        let str =  window.location.hash.split("/").slice(1,i+1).join("/")
       history.push(`/${str}`)
    }

    firebase.auth.onAuthStateChanged(user=>{
        if(user){
            setLoading(false)
            setUser(user)
        }
        else{
            setLoading(false)
            setUser(null)
            setTimeout(()=>{
                history.push("/")
            },1000)
        }
    })
    
    if(loading){
    return <Result icon={<Spin size="large"/>}/>
    }
    if(user&&!user.isAnonymous){
        return (
        <div className="fade-in-fwd " >
            <Breadcrumb style={{marginBottom:"20px"}}>
                {location.pathname.split("/").map((i,k)=>{
                    
                    if(i)return (<Breadcrumb.Item onClick ={()=>breadCrumbNavigate(String(i))} key={k}>
                       <Button
                       type="link"
                       >
                          { String(i).charAt(0).toUpperCase()+String(i).substr(1)}
                       </Button> 
                        
                        </Breadcrumb.Item>)
                    else{return null}
                })}
            </Breadcrumb>
          
            <Component params={params} user={user} firebase={firebase}/>
         
        </div>)
    }
    else{
        return <Result status="info" title="You Are Logged Out" subTitle={
            <p>You will be redirected in a moment</p>
        }
        />
    }
}


const ProtectedRoutesWrapped =  withFirebase(ProtectedRoutes);

export default ProtectedRoutesWrapped;
export {ProtectedRoutes};