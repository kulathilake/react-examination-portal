import React, { useState } from 'react';
import { Row, Col, PageHeader, Typography, Select, InputNumber, Statistic, Button,  Affix } from 'antd';
import { useHistory } from 'react-router-dom';
import AnswerComponent from '../../components/grading/AnswerComponent';
import { MailOutlined } from '@ant-design/icons';

export default function GradeExainationPage({
    title,
    questions,
    candidates,
    currentCandidate,
    setCurrentCandidate,
    currentScript,
    marks,
    setMark,
    saveGrading,
    publishResults
}){
    const history = useHistory();
    const [currentQuestion,setCurrentQuestion] = useState(questions[0])
    
    const totalMarks = Object.values(marks).reduce((a,b)=>{
        if(b){
            return a+b
        }
        else{
            return a+0
        }},0)

    const completion = Object.values(marks).reduce((a,b)=>{
        console.log(b)
        if(b&&String(b).length>0){return a+1}
   
        else{return a+0}
    },0)

    return  <Row gutter={[24,24]}>

            <Col xs={24} sm={24} md={6}>
                <PageHeader
                    title="Grade Examination"
                    onBack={()=>history.push("/app")}
                />
                <Affix>
                <div className="component-content" style={{padding:"10px"}}>
                <label>Examination Title</label>
                <Typography.Title level={2}>{title}</Typography.Title>
                                    
                <strong>Candidate</strong>
                    <Select
                    value={currentCandidate}
                    onSelect={(value)=>{setCurrentCandidate(value)}}
                    style={{width:"100%",marginBottom:"10px"}}
                    placeholder="Select a Candidate"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {candidates?.map((c,k)=>{
                        return<Select.Option key={k} value={c.email}>{c.email}</Select.Option>
                    })}

                </Select>

                <Statistic
                title="Marks"
                value={totalMarks}
                />
                <span>
                    <Statistic
                title="Grading Completion"
                value={completion+" of "+questions.length+" Questions"}
                valueStyle={{fontSize:"small"}}
                />
                </span>

                <Button onClick={()=>saveGrading()}>Save Grading</Button>
                <Button onClick={()=>publishResults(parseInt(completion)===questions.length,totalMarks)}><MailOutlined/>Email to Candidate</Button>

                </div>
                </Affix>
            </Col>

            <Col className="component-content" xs={24} sm={24} md ={16}>

              <Row>

                    <Col md={18}>
                        <AnswerComponent
                        title ={currentQuestion?.title}
                        answer ={currentScript[currentQuestion?.id]}
                        mark ={currentScript[currentQuestion?.id]?.mark}
                        />
                    </Col>

                    <Col md={6} style={{backgroundColor:"rgba(103,159,169,0.3)",margin:"0px",padding:"10px",width:"100%",height:"100%",}}>
                    <label>Select Question</label>
                <Select
                    value={currentQuestion?.title}
                    onSelect={(value)=>{setCurrentQuestion(questions[value])}}
                    style={{width:"100%"}}
                    placeholder="Select Question"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                >
                    {questions?.map((q,k)=>{
                        return<Select.Option key={k} value={k}>{q.title}</Select.Option>
                    })}
                </Select>
               
                   <label>Award Marks</label><br/>
                   <InputNumber
                   value={marks[currentQuestion?.id]}
                   onChange={value=>setMark(currentQuestion?.id,value)}
                   />
                    </Col>
                </Row>
 
            </Col>
        
    </Row>
}
