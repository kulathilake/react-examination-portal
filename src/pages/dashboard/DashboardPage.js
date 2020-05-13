import React, { useEffect, useState } from 'react';
import {withFirebase} from '../../firebase'
import { Row,Col, Spin, Button, Empty } from 'antd';
import ExamCard from '../../components/dashboard/ExamCard.js';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Dashboard({firebase}){

    const [exams,setExams] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        firebase.fetchExamList().then(res=>{
            setExams(res.docs.map(i=>{return {...i.data(),id:i.id}}))
            setLoading(false)
        })
    },[firebase]);

return (
    <div  style={{padding:"10px"}} >
    <Row justify="center" gutter={[24,24]}>
        {loading&&<Spin tip="Fetching Your Exams" />}
        {exams.length?exams.map((exam,key)=>{
            return (
                <Col  xs ={14} sm={12} md={6} lg={4} key={key} span={4}>            
                    <ExamCard data={exam}/>
                </Col>
            )
            
            })
        :!loading&&<Empty description="It looks like you have not created any Examination. Click + button to begin!"/>}
    </Row>
    <Link to="app/exam/new">

    <Button className="btn-add-float  component-shadow" type="primary"  size="large" shape="circle">
        <PlusOutlined/>
    </Button>
    </Link>
    </div>
    )
}

const DashboardWrapped = withFirebase(Dashboard);

export default DashboardWrapped;
export {Dashboard};