import React from 'react';
import { Card, Typography, Popconfirm, Tooltip} from 'antd';
import { DeleteOutlined, EditFilled, EyeFilled, CheckCircleFilled} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const ExamCard = ({data,deleteExam})=>(
    <Card 
        className="component-exam-card swing-in-top-fwd"
        actions={[
            <Tooltip
            title="Edit"
            placement="bottom"
            >
                <Link to={"/app/exam/update/"+data?.id}><EditFilled/></Link>
            </Tooltip>,
            <Tooltip
            title="Candidate View"
            placement="bottom"
            >
                <Link to={"/exam/"+data?.id}><EyeFilled/></Link>
            </Tooltip>,
            <Tooltip
            title="Grade Exam"
            placement="bottom">
            <Link to={"/app/exam/grade/"+data?.id}><CheckCircleFilled/></Link>
            </Tooltip>,
            <Popconfirm 
            title="Delete Exam?"
            placement="bottom"
            onConfirm={()=>deleteExam(data?.id)} >
                <DeleteOutlined style={{color:"red"}}/>
            </Popconfirm>
        ]}
    >
        <div style={{height:"102px"}} className="component-exam-card-content">

        <Typography.Title level={3}>  {data?.title||"Untitled"}</Typography.Title>
        </div>
    
    </Card>
)

export default ExamCard;