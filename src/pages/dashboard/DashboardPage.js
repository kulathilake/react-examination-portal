import React, { useEffect, useState } from 'react';
import {withFirebase} from '../../firebase'
import { Row,Col, Spin, Button } from 'antd';
import ExamCard from '../../components/dashboard/ExamCard.js';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function Dashboard({firebase}){

    const [exams,setExams] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        firebase.fetchExamList().then(res=>{
            setExams(res.docs.map(i=>{return i.data()}))
            setLoading(false)
            console.log("ddd")
        })
    },[firebase]);

return (
    <div>
    <Row justify="center" gutter={[24,24]}>
        {loading&&<Spin tip="Fetching Your Exams" />}
        {exams.map((exam,key)=>{
            return (
                <Col  xs ={24} sm={12} md={4} key={key} span={4}>            
                    <ExamCard data={exam}/>
                </Col>
            )
            
            })
        }
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