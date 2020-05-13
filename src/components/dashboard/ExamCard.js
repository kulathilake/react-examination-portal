import React from 'react';
import { Card, Typography, Popconfirm} from 'antd';
import { DeleteOutlined, EditFilled} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const ExamCard = ({data,deleteExam})=>(
    <Card 
        className="component-exam-card"
        actions={[
            <Link to={"/app/exam/update/"+data.id}><EditFilled/></Link>,
            <Popconfirm 
            title="Delete Exam?"
            placement="bottom"
            onConfirm={()=>deleteExam()} >
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