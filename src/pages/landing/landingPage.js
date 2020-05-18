import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Row,Button,Col,  Typography, Avatar } from 'antd';
import {withFirebase} from '../../firebase'
import { Link } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/android-chrome-512x512.png'
import Img1 from '../../assets/images/standing.png'
function LandingPage({firebase}){

    const [user,setUser] = useState(null)

    firebase.auth.onAuthStateChanged(user=>{
        if(user){
            setUser(user)
        }
        else{
            setUser(null)
        }
    })
    
    return <div className="landing-page-container">
            <Row justify="center">
               <Col md={4}>
                   {user?
                    <Link to="/app">
                    <Button size="large" type="primary" className="btn-go-to-app">Go To App</Button>
                    </Link>:
                    <Button size="large" type="primary"><GoogleOutlined/>Sign In With Google</Button>
                }
               </Col>

            </Row>
           <Row style={{marginTop:"100px"}} justify="center">
               <Typography.Title>A hackable text editor for the 21st Century</Typography.Title>
           </Row>

           <Row  gutter={[{md:0},{md:32}]}>
               <Col md={4} style={{paddingTop:"100px"}}>
                <img src={Logo} width={128} alt="Actuator XMS logo"/>

               </Col>
               <Col md={8} style={{paddingTop:"100px"}}>
                   <Typography.Title level={3}>Sub Title 2</Typography.Title>
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspace and edit code together in real time. To start collaborating, open Teletype in Atom and install the package.
               </Col>
               <Col md={12} >
               <img src={Img1}  alt="Actuator XMS logo"/>
               </Col>
           </Row>

           <Row>
               <Col md={12}>
               <img src={Img1}  alt="Actuator XMS logo"/>
               </Col>
               <Col md={8}>
               <Typography.Title level={3}>Sub Title 3</Typography.Title>
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspace and edit code together in real time. To start collaborating, open Teletype in Atom and install the package.
               </Col>
               <Col md={4}>
               <img src={Logo} width={128} alt="Actuator XMS logo"/>
               </Col>
           </Row>

           <Row justify="center">
               <Typography.Title>Features</Typography.Title>

           </Row>
           
       </div>

}


const LandingPageWrapped =  withFirebase(LandingPage);

export default LandingPageWrapped;
export {LandingPage};

LandingPage.propTypes = {
    user: PropTypes.object
}