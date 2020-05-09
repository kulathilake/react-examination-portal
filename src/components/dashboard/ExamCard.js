import React from 'react';
import { Card, Typography, Popconfirm} from 'antd';
import { DeleteOutlined, EditFilled} from '@ant-design/icons'

const ExamCard = ({data,deleteExam})=>(
    <Card 
        className="component-exam-card"
        actions={[
            <EditFilled/>,
            <Popconfirm 
            title="Delete Exam?"
            placement="bottom"
            onConfirm={()=>deleteExam()} >
                <DeleteOutlined/>
            </Popconfirm>
        ]}
    >

      <Typography.Title level={3}>  {data.title||"Untitled"}</Typography.Title>
    
    </Card>
)

export default ExamCard;