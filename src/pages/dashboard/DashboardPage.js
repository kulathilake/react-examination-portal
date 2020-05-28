import React, { useEffect, useState } from 'react';
import {withFirebase} from '../../firebase'
import { Row,Col, Spin, Button,  message,  Card, notification } from 'antd';
import ExamCard from '../../components/dashboard/ExamCard.js';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Dashboard({firebase}){

    const [exams,setExams] = useState([])
    const [loading,setLoading] = useState(true)
    // const [tutorial,setTutorial] = useState(false)
    // const history= useHistory();

    useEffect(()=>{
        firebase.fetchExamList().then(res=>{
            if(res.empty)notification.info({
                message:"Your Examinations List is Empty",
                description: <p>To create a new examination, click on the  <PlusOutlined/> button in the dashboard.
                </p>

            })
            setExams(res.docs.map(i=>{return {...i.data(),id:i.id}}))
            setLoading(false)
        })
    },[firebase]);

    const deleteExam = (id) =>{
        firebase.deleteExamination(id).then(res=>{
            message.success("Examination Deleted")
            setExams(exams.filter((exam)=>{
                return exam.id !==id
            }))
        })
    }
return (
    <div  style={{padding:"10px"}} >
    <Row justify="center" gutter={[24,24]}>
    <Col  xs ={14} sm={12} md={6} lg={4} key={"new"} span={4}>  
        <Card 
        className={"component-exam-card swing-in-top-fwd new"} 
        >
              
    <Link to="app/exam/new">
 
    <Button className="btn-add-float component-shadow " type="primary"  size="large" shape="circle">
        <PlusOutlined/>
    </Button>
    <h3>
    Create new Examination
    </h3>

 </Link>

        </Card>
        </Col>
        
        {loading&&<Spin tip="Fetching Your Exams" />}
        {exams.length?exams.map((exam,key)=>{
            return (
                <Col  xs ={14} sm={12} md={6} lg={4} key={key} span={4}>            
                    <ExamCard deleteExam={deleteExam} data={exam}/>
                </Col>
            )
            
            })
        :!loading&&
        null
        // <Col style={{backgroundColor:"white"}}>
        // <Empty description="It looks like you have not created any Examination. Click + button to begin!"/>
        // </Col>
        }
    </Row>

    </div>
    )
}

const DashboardWrapped = withFirebase(Dashboard);

export default DashboardWrapped;
export {Dashboard};