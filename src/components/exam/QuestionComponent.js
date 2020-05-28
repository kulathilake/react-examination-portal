import React, { useState,useEffect } from 'react';
import { Typography, Input,   message, Statistic, Divider, Button, Row, Col } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
function noCutCopyPaste(e){e.preventDefault();message.info("Clipboard functions are not allowed!")}

export default ({id,title,answers,setAnswer})=>{
const [value,setValue] = useState(answers[id])

useEffect(()=>{
        setValue(answers[id])
},[answers,id])

useEffect(()=>{
    if(String(value)?.match(/\S+/g)?.length%10===0&&String(value)?.endsWith(" ")){
        setAnswer({...answers,[id]:value})
        message.success("Autosaved",0.5)
    }
},[value])

 return   <Row gutter={[24,24]}>

     <Col md={20} sm={24} xs={24} >
        <Typography.Text  
        
        className="question-text"
            onDragStart={e=>noCutCopyPaste(e)}
        onCopy={e=>noCutCopyPaste(e)}
        strong
        >{title}</Typography.Text>
        <Divider/>
            <Input.TextArea 
            onDrop={e=>noCutCopyPaste(e)}
            onCut={e=>noCutCopyPaste(e)}
            onCopy={e=>noCutCopyPaste(e)}
            onPaste={e=>noCutCopyPaste(e)}
            style={{height:"100%"}} rows={4} 
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            />
     </Col>

       <Col md={4} sm={24}>

        <Button type="primary" onClick={()=>{message.success("Saved",0.5);setAnswer({...answers,[id]:value})}}><SaveOutlined/> Save</Button>
        <Statistic
        title="Word Count"
        value={value&&String(value).match(/\S+/g).length}
        />
        </Col>
    </Row>
}