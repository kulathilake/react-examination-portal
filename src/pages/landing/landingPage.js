import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Row,Button,Col,  Typography } from 'antd';
import {withFirebase} from '../../firebase'
import { Link } from 'react-router-dom';

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
                   {user&&
                    <Link to="/app">
                    <Button type="primary" className="btn-go-to-app">Go To App</Button>
                    </Link>
                   }
               </Col>
            </Row>
           <Row justify="center">
               <Col  sm={24}  md={20} className="landing-page-left" >
                    <div className="landing-page-text text1" >
                    <Typography.Title style={{color:"blue"}}level={3}>Actuator XMS</Typography.Title>
                    <Typography.Paragraph>A simple yet powerful tool to conduct online examinations and assignments.
                    </Typography.Paragraph>
                    </div>

         
               </Col>
           </Row>
       </div>

}


const LandingPageWrapped =  withFirebase(LandingPage);

export default LandingPageWrapped;
export {LandingPage};

LandingPage.propTypes = {
    user: PropTypes.object
}