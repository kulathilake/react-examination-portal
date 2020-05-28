import React, { useState } from 'react';
import { Row, Col, PageHeader, Typography,Spin, Select, InputNumber, Statistic, Button,  Affix ,Tree, Divider} from 'antd';
import { useHistory } from 'react-router-dom';
import AnswerComponent from '../../components/grading/AnswerComponent';
import { MailOutlined,InfoCircleFilled,SaveOutlined, CheckCircleFilled } from '@ant-design/icons';

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
    const [value,setValue] = useState();
        console.log(marks)
    const totalMarks = Object.values(marks).reduce((a,b)=>{
        if(b){
            return a+b
        }
        else{
            return a+0
        }},0)

    const completion = Object.values(marks).reduce((a,b)=>{
        console.log(b)
        if(b!==null&&String(b).length>0){return a+1}
   
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

              <Col md={18} sm={24} xs={24} >
                        <AnswerComponent
                        title ={currentQuestion?.title}
                        answer ={currentScript[currentQuestion?.id]}
                        mark ={currentScript[currentQuestion?.id]?.mark}
                        />
                    </Col>

                    <Col md={6} sm={24} style={{margin:"0px",padding:"10px",width:"100%",height:"100%",}}>
                    <Row justify="center" gutter={[24,12]}>
                        <Col >
                            <label>Award Marks</label><br/>
                            <InputNumber
                            value={marks[currentQuestion?.id]}
                            onChange ={value=>setValue(value)}
                            />
                            <Button  type="primary" onClick={()=>setMark(currentQuestion?.id,value)}><SaveOutlined/>Save</Button>
                        </Col>
                        <Divider/>
                        <Col style={{overflowY:"scroll",maxHeight:"40vh"}}>
                        <Tree 
                    defaultExpandAll
                    showLine={true}
                    showIcon={true}
                    onSelect={(key)=>{
                        setCurrentQuestion(questions[parseInt(key[0]&&key[0].split("-")[1])])}}
                    style={{width:"100%",backgroundColor:"none"}}
                    autoExpandParent={true}
                    >
                        
                        <Tree.TreeNode 
                            title={title+" Outline"} 
                            isStart={true} 
                            selectable={false}
                            key={"0"}
                            children={
                            questions.length?questions?.map((question,key)=>{
                                return <Tree.TreeNode  switcherIcon={marks[question.id]!==undefined?
                                <CheckCircleFilled style={{color:"green"}} />:
                                <InfoCircleFilled/>
                                } isLeaf={true} key={"0-"+key}  
                                title={String(question.title).slice(0,15).concat("...")}/>
                            }):<Spin/>
                        }/>
                        
                    </Tree>
                        </Col>


                    </Row>

                         
                
               
                
                    </Col>
                </Row>
 
            </Col>
        
    </Row>
}
