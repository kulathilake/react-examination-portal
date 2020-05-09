import React, { useState } from 'react';
import { Row,Col, PageHeader, Input, DatePicker, Typography, Divider, TimePicker, Button,Table,Popconfirm, Badge, Switch } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import QuestionModal from '../../components/exam/QuestionModal';
import CandidateModal from '../../components/exam/CandidateModal';

export default function CreateUpdateExamPage({
    examTitle,
    examDate,
    examStartTime,
    examDuration,
    examQuestions,
    examCandidates,
    examPolicy,
    setExamTitle,
    setExamDate,
    setExamStartTime,
    setExamDuration,
    setExamQuestions,
    setExamCandidates,
    setExamPolicy,
    deleteExamQuestion,
    deleteExamCandidate,
    updateExamQuestion,
    updateExamCandidate
}){
    const history = useHistory();

    const [questionModalState,setQuestionModalState] = useState(false);
    const [question,setQuestion] = useState(null)
    const [update,setUpdate] = useState(null);

    const [candidateModalState,setCandidateModalState] = useState(false);
    const [candidate,setCandidate] = useState(null);



    return(
        <Row gutter={[24,24]}>

            <Col md={5}>
                <PageHeader 
                onBack={()=>history.push("/app")}
                title="New Exam"/> 
                
                <div className="">
                    <Badge status={examTitle?"success":"default"} text="Basic Information"/><br/>
                    <Badge status={examDate&&examStartTime&&examDuration?"success":"default"} 
                    text="Schedule"/><br/>
                    <Badge status={examQuestions.length?"success":"default"} text="Questions"/><br/>
                    <Badge status={examCandidates.length?"success":"default"} text="Candidates"/><br/>
                    <Badge status="default" text="Publish"/>

                </div>
                
            </Col>

            <Col className="component-content" md ={16}>
                <Input.Group compact >
                    <Typography.Title level={3}>Basic Information </Typography.Title>
                    <Input 
                    value={examTitle}
                    placeholder="Examination Title"
                    onChange={(e)=>setExamTitle(e.target.value)}
                    />
                    <Divider style={{backgroundColor:"darkGray"}}/>
                </Input.Group>

                <Input.Group>
                    <Typography.Title level={3}>Schedule</Typography.Title>
                     <Switch onChange={(checked)=>setExamPolicy("TIME",checked)} className="btn-section-toggle"  defaultChecked={examPolicy.TIME}/>
                    <DatePicker disabled={!examPolicy.TIME} onChange={(value)=>setExamDate(value)}  value={examDate} />
                    <TimePicker disabled={!examPolicy.TIME} onChange={(value)=>setExamStartTime(value)}  value={examStartTime} />
                    <TimePicker disabled={!examPolicy.TIME} onChange={(value)=>setExamDuration(value)}  value={examDuration} placeholder="Select Duration"/>
                    <Divider style={{backgroundColor:"darkGray"}}/>
                </Input.Group>
                <Input.Group>
                    <Typography.Title level={3}>Questions</Typography.Title> 
                    
                    <Table dataSource={examQuestions} >
                        <Table.Column width="80%" title="Question" dataIndex="title"/>
                        <Table.Column title="Options" dataIndex="id" key="title" 
                            render={id=>(
                            <>
                            <Button 
                            onClick={()=>{
                                setQuestion(examQuestions.filter(question=>{return question.id===id})[0].title);
                                setUpdate(id)
                                setQuestionModalState(true)}}
                            type="dashed"><EditFilled/></Button>
                            <Popconfirm 
                                title="Delete Question?"
                                placement="bottom"
                                onConfirm={()=>deleteExamQuestion(id)} >
                            <Button  type="dashed"><DeleteFilled/></Button>
                            </Popconfirm>
                            </>)}
                        />
                    </Table>  
                    
                    <Button className="btn-add-float-question" type="primary"  size="large" 
                        onClick={()=>setQuestionModalState(true)}
                    >
                    Add Questions            
                        <PlusOutlined/>
                    </Button> 
                         <Divider style={{backgroundColor:"darkGray"}}/>
                </Input.Group>
                <Input.Group>
                    <Typography.Title level={3}>Candidates</Typography.Title> 
                    <Table dataSource={examCandidates}>
                        <Table.Column  title="Email" dataIndex="email"/>
                        <Table.Column  title="OTP" dataIndex="otp"/>
                        <Table.Column title="Options" dataIndex="otp" key="otp" 
                            render={
                                otp => (
                                    <Popconfirm 
                                    title="Delete Candidate?"
                                    placement="bottom"
                                    onConfirm={()=>deleteExamCandidate(otp)} >
                                <Button  type="dashed"><DeleteFilled/></Button>
                                </Popconfirm>
                                )
                            }
                        />
                    </Table>  
                    <Button onClick = {()=>setCandidateModalState(true)}
                    className="btn-add-float-question" type="primary"  size="large" >
                    Add Candidates<PlusOutlined/>
                    </Button> 
                </Input.Group>
            </Col>

            <QuestionModal 
            active={questionModalState} 
            setActive={setQuestionModalState} 
            question={question}
            setQuestion={setQuestion}
            setExamQuestion={setExamQuestions}
            update={update}
            setUpdate={setUpdate}
            updateExamQuestion={updateExamQuestion}
                            />

            <CandidateModal
                candidate={candidate}
                setCandidate={setCandidate}
                setExamCandidates={setExamCandidates}
                active={candidateModalState}
                setActive={setCandidateModalState}
            />
        </Row>
    )

}