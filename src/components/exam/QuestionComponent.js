import React, { useState, useEffect } from 'react';
import { Typography, Input,   message, Statistic, Divider, Button } from 'antd';
function noCutCopyPaste(e){e.preventDefault();message.info("Clipboard functions are not allowed!")}

export default ({id,title,answers,setAnswer})=>{
const [value,setValue] = useState(answers[id])
useEffect(()=>{
        setValue(answers[id])
},[answers[id]])
 return   <Input.Group>
    <Typography.Text    
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
        style={{height:"100%"}} rows={10} 
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />
        <Button onClick={()=>{setAnswer({...answers,[id]:value})}}>Save</Button>
        <Statistic
        title="Word Count"
        value={value&&String(value).match(/\S+/g).length}
        />
    </Input.Group>
}