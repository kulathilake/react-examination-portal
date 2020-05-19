import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Row,Button,Col, Descriptions } from 'antd';
import {withFirebase} from '../../firebase'
import { Link, useHistory } from 'react-router-dom';
import { GoogleOutlined,  Loading3QuartersOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/logo.png'

function LandingPage({firebase}){

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true);
    const history = useHistory()
    firebase.auth.onAuthStateChanged(user=>{
        if(user){
            setUser(user)
            setLoading(false)
        }
        else{
            setUser(null)
            setLoading(false)
        }
    })
    
    const handleSignIn = () => {
        firebase.signInWithPopup().then(res=>{
            history.push("/app")
        })
    }
    
    return <div className="landing-page-container  fade-in-fwd"  style={{color:"white"}}>
     
           <Row justify="center">
               <Col md={8} style={{textAlign:"center "}}>
                <img src={Logo} class="center" alt="Actuator XMS logo"/>
               </Col>
           </Row>

           <Row justify="center">
               <Col md={4}>
                   {user&&!user?.isAnonymous?
                    <Link to="/app">
                    <Button  style={{width:"100%"}} size="large" type="primary" className="btn-go-to-app">
                        Go to App
                    </Button>
                    </Link>:
                    <Button style={{width:"100%"}} onClick={()=>handleSignIn()} size="large" type="primary">
                        {loading?<span><Loading3QuartersOutlined spin/></span>:
                        <span><GoogleOutlined/> Get Started With Google</span>
                        }
                        </Button>
                }
               </Col>

            </Row>
            <Row justify="center">                
                <Col className="landing-page-subtitle">
                <h2
                >A simple yet powerful tool for Online Examinations
                </h2>
               </Col>
            </Row>

           <Row  gutter={[{md:0},{md:32}]}>
               <Col md={6} sm={12} xs={10} className="landing-page-sub-section for-educators">
               </Col>

               <Col md={8} sm={12} xs={14}className="landing-page-sub-section-content show-on-scroll " >
                   <h2>For Educators</h2>
              
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspace and edit code together in real time. To start collaborating, open Teletype in Atom and install the package.
               </Col>
               <Col md={8} >

               </Col>


           </Row>

           <Row gutter={[{md:0},{md:32}]}>
                <Col md={10} > </Col>


               <Col md={8} sm={12} xs={14} className="landing-page-sub-section-content .show-on-scroll " >
                   <h2>For Trainers</h2>
         
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspace and edit code together in real time. To start collaborating, open Teletype in Atom and install the package.
               </Col>
         

               <Col md={6} sm={12} xs={10} className="landing-page-sub-section for-trainers">
               </Col>


           </Row>
                <hr/>
         
           <Row justify="center" gutter={[24,24]}>
                <Descriptions 
                colon={false}
                layout="vertical"
                className="landing-page-features"
                title={ <div  className="landing-page-subtitle">
               <h2>Features</h2>
               </div>}>
                    <Descriptions.Item className="landing-page-features-item" label= "Structured Examination Model">
                         <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Candidate Access Control">
                        <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Timebased Access Control">
                    <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Examination Publication">
                    <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Clipboard Restrictions">
                    <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Examination Timer">
                    <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Examination Grading Tools">
                    <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" label= "Results Publication">

                               <div className="landing-page-features-content">
                        Teletype for Atom
                        Great things happen when developers work together—from teaching and sharing knowledge to building better software. Teletype for Atom makes collaborating on code just as easy as it is to code alone, right from your editor.
                       Share your workspa
                        </div>
                    </Descriptions.Item>
                    <Descriptions.Item className="landing-page-features-item" >
                    <div className="landing-page-features-content">
                     <Link to="doc">
                         <strong>Read the Docs</strong></Link>
                    </div>

                    </Descriptions.Item>
                </Descriptions>
           </Row>  
           <hr/>
         
         <Row justify="center" gutter={[24,24]}> 
         
         
         </Row>
           
       </div>

}






const LandingPageWrapped =  withFirebase(LandingPage);

export default LandingPageWrapped;
export {LandingPage};

LandingPage.propTypes = {
    user: PropTypes.object
}