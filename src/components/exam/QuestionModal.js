import React, { useState, useEffect } from 'react';
import {Modal, Input} from 'antd';
import uid from 'uid';

const QuestionModal = ({setExamQuestion,question,setQuestion,active,setActive,update,setUpdate,updateExamQuestion})=>{
    
    const [value,setValue] = useState(question)
    
    useEffect(()=>{
        setValue(question)
    },[question])
    
    return <Modal
    visible={active}
    onCancel={()=>{
        setQuestion(null);
        setActive(false)}}
        onOk ={()=>{
            if(update){
                //TODO: Create an Update method in CreateUpdateExamComponent
                updateExamQuestion(update,value);
                setUpdate(null)
                
            }else{
            setValue(null)
            setExamQuestion({id:uid(4),title:value})
        }
        
        ;setQuestion(null);setActive(false)}}
    title = {update?"Update Question":"Create New Question"}
    >
        <Input.TextArea value={value}  
        // onChange={(e)=>setQuestion(e.target.value)} 
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Question Content"/>

    </Modal>
}

export default QuestionModal;