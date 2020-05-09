import React from 'react';
import {Modal, Input} from 'antd';
import uid from 'uid';

const QuestionModal = ({setExamQuestion,question,setQuestion,active,setActive,update,setUpdate,updateExamQuestion})=>(
    <Modal
    visible={active}
    onCancel={()=>{
        setQuestion(null);
        setActive(false)}}
    onOk ={()=>{
        if(update){
            //TODO: Create an Update method in CreateUpdateExamComponent
            updateExamQuestion(update,question);
            setUpdate(null)
        }else{

            setExamQuestion({id:uid(4),title:question})
        }
        
        ;setQuestion(null);setActive(false)}}
    title = {update?"Update Question":"Create New Question"}
    >
        <Input.TextArea value={question}  onChange={(e)=>setQuestion(e.target.value)}maxLength={300} placeholder="Question Content. Max Length 300"/>

    </Modal>
)

export default QuestionModal;