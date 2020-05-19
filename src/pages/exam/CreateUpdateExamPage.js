import React, { useState, Fragment } from 'react';
import {Affix, Row,Col, PageHeader, Input, DatePicker,  Typography, Divider, TimePicker, Button,Table,Popconfirm, Switch, Modal, notification } from 'antd';
import { PlusOutlined, EditFilled, DeleteFilled} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import email from '../../helpers/credentialsEmail';
import QuestionModal from '../../components/exam/QuestionModal';
import CandidateModal from '../../components/exam/CandidateModal';
import moment from 'moment';

export default function CreateUpdateExamPage({
    id,
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
    updateExamCandidate,
    handleSaveExamination,
    existing
}){
    const history = useHistory();
    const [questionModalState,setQuestionModalState] = useState(false);
    const [question,setQuestion] = useState(null)
    const [update,setUpdate] = useState(null);

    const [candidateModalState,setCandidateModalState] = useState(false);
    const [candidate,setCandidate] = useState(null);
    const [publishModal,setPublishModal] = useState(false)

    const getDate=()=>{
        if(examPolicy.TIME){
            return moment().date(examDate.date()).hour(examStartTime.hour()).minute(examStartTime.minute()).toISOString()
        }else{
            return null
        }
    }

    const getUrl = () =>{
        return `${window.location.origin}/#/exam/${id}`
    }

    const publishExam = () =>{
        setPublishModal(true)

        Promise.all(examCandidates.map(candidate=>{
            if(!candidate.published){
                return window.Email.send({
                    SecureToken:"2a2e24d2-bc4a-403e-b676-7f4483d4b869",
                    To : candidate.email,
                    From : "ActuatorApps@gmail.com",
                    Subject : examTitle,
                    Body : email(examTitle,getUrl(),getDate(),candidate.email,candidate.otp)
                }).then(res=>{
                        if(res==="OK"){
                            notification.success({
                                message:`Delivered to ${candidate.email}`
                            })
                            candidate.published = true
                            handleSaveExamination()
                        }else{
                            notification.error({
                                message:`Delivery failed to ${candidate.email}`
                            })
                        }
                })
            }else{
                return []
            }
        }))

    }

    return(
        <Row gutter={[24,24]}>

            <Col xs={24} sm={24} md={5}>
                <PageHeader 
                onBack={()=>history.push("/app")}
                title={existing?"Update Exam":"New Exam"}/> 
                
            <Affix  offsetTop={10}>
                <div style={{padding:"10px"}}className="component-content">
         
                    {/* <Badge status={examTitle?"success":"default"} text="Basic Information"/><br/>
                    <Badge status={examDate&&examStartTime&&examDuration?"success":"default"} 
                    text="Schedule"/><br/>
                    <Badge status={examQuestions.length?"success":"default"} text="Questions"/><br/>
                    <Badge status={examCandidates.length?"success":"default"} text="Candidates"/><br/>
                    <Badge status="default" text="Publish"/> */}
                {/* <Row gutter={24}>
                    <Col>
                    <Statistic title="Candidates"  value={examCandidates.length}/><br/>
                    </Col>
                    <Col>
                    <Statistic title="Cost" prefix="$" precision={2} value={examCandidates.length}/><br/>
                    </Col>
                    <Col>
                    <Statistic title="Credits" prefix="$" precision={2} value={100 - examCandidates.length}/><br/>
                    </Col>
                </Row> */}
                <Row>
                    <Button onClick={()=>handleSaveExamination()} type="ghost">Save Exam</Button>
                    <Button onClick={()=>publishExam()}type="primary">Publish Exam</Button>
                </Row>
                </div>
            </Affix>
                
            </Col>

            <Col className="component-content" xs={24} sm={24} md ={16}>
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
                     <Switch onChange={(checked)=>setExamPolicy("TIME",checked)} className="btn-section-toggle" checked={examPolicy.TIME}  defaultChecked={examPolicy.TIME}/>
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
                        onClick={()=>{
                            setQuestionModalState(true)}}
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

            <Modal
            visible={publishModal}
            onOk={()=>{setPublishModal(false)}}
            onCancel={()=>{setPublishModal(false)}}
            title="Copy this link and Share with your Candidates"
            centered
            footer={
            <Fragment>
            </Fragment>
        }
        >   
                <Input value={`${window.location.origin}/#/exam/${id}`}/>
        <small>Please securely distribute each of the generated OTPs to respective candidates</small>
        
            </Modal>
        </Row>
    )

}