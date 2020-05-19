import React, {  useState } from 'react'
import { Row, Avatar, Typography, Col, Button, Popconfirm, Divider, Descriptions, Modal } from 'antd'
import { DollarOutlined } from '@ant-design/icons'

export default function ProfilePage({user,credits,deleteUser}){

    const [buy,setBuy] = useState(false)

    return  <Row gutter={[24,24]} justify="center">

        
        <Col md={8} sm={24} xs={24} className="component-content">
            <Row justify="center">
                <Avatar
                    src={user.photoURL}
                    size={128}
                    
                    />
                {/* <Button
                type="ghost"
                shape="circle"
                ><CameraFilled/></Button> */}
            </Row>
            <Row justify="center">
            <Typography.Title  level={3}>{user.displayName}</Typography.Title>
            </Row>

            <Divider/>

            {/* <Row justify="center">
         
                <Descriptions title={<Button type="primary" onClick={()=>setBuy(true)}><DollarOutlined/>Buy Credits</Button>} layout="vertical">
            <Descriptions.Item  label="Credit Balance">{credits?.balance||"100.00"}</Descriptions.Item>
            <Descriptions.Item label="Rate">{credits?.currency+credits?.rate+"/Credit"}</Descriptions.Item>
            <Descriptions.Item label="Currency">{credits?.currency||"USD"}</Descriptions.Item>
                </Descriptions>
                   
            </Row>
                
            <Divider/> */}
           {/* <Typography.Text type="danger">Danger Zone</Typography.Text> */}
            <Row justify="center">
                <Popconfirm
                title="You are about to Delete Your account. This action cannot be undone. Proceed?"
                onConfirm={()=>deleteUser()}
                >
                <Button
                danger
                type="primary"
                >Delete Account</Button>
                </Popconfirm>
            </Row>
        </Col>
        


                <Modal
                title="Buy XMS Credits"
                visible={buy}
                onCancel={()=>{
                    setBuy(false)
                }}
                >

                </Modal>
    </Row>

}