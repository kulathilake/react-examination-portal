import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Row,Button,Col, Carousel } from 'antd';
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
               <Col   sm={24}  md={20} className="landing-page-left">
    
               </Col>
               <Col md={4}>
                   {user&&
                    <Link to="/app">
                    <Button type="primary" className="btn-go-to-app">Go To App</Button>
                    </Link>
                   }
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