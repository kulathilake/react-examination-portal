import React from 'react';
import { Typography, Input,   message, Statistic } from 'antd';
function noCutCopyPaste(e){e.preventDefault();message.info("Clipboard functions are not allowed!")}

export default ({id,title,answers,setAnswer})=>(
    <Input.Group>
    <Typography.Title    
        onDragStart={e=>noCutCopyPaste(e)}
    onCopy={e=>noCutCopyPaste(e)} level={4}>{title}</Typography.Title>
        <Input.TextArea 
        onDrop={e=>noCutCopyPaste(e)}
        onCut={e=>noCutCopyPaste(e)}
        onCopy={e=>noCutCopyPaste(e)}
        onPaste={e=>noCutCopyPaste(e)}
        style={{height:"100%"}} rows={10} 
        value={answers[id]} 
        onChange={(e)=>{setAnswer({...answers,[id]:e.target.value})}}
        />
        <Statistic
        title="Word Count"
        value={answers[id]&&String(answers[id]).match(/\S+/g).length}
        />
    </Input.Group>
)