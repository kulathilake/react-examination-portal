import React from 'react';
import { Card, Typography, Popconfirm} from 'antd';
import { DeleteOutlined, EditFilled, EyeFilled} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const ExamCard = ({data,deleteExam})=>(
    <Card 
        className="component-exam-card"
        actions={[
            <Link to={"/app/exam/update/"+data.id}><EditFilled/></Link>,
            <Link to={"/exam/"+data.id}><EyeFilled/></Link>,
            <Popconfirm 
            title="Delete Exam?"
            placement="bottom"
            onConfirm={()=>deleteExam(data.id)} >
                <DeleteOutlined/>
            </Popconfirm>
        ]}
    >
        <div style={{height:"102px"}}>

        <Typography.Title level={3}>  {data.title||"Untitled"}</Typography.Title>
        </div>
    
    </Card>
)

export default ExamCard;