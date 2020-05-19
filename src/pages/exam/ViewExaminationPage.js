import React, { useState } from 'react';
import {Row,Col,Affix,Button, Statistic, Tree, Divider, Spin, Typography } from 'antd';
import {InfoCircleFilled} from'@ant-design/icons';
import Question from '../../components/exam/QuestionComponent';
export default function CreateUpdateExamPage({
    timer,
    title,
    examQuestions,
    answers,
    setAnswers,
    submitAnswers
}){
    const [currentQuestion,setCurrentQuestion] = useState(0);
    
    return(
        <Row gutter={[24,24]}>
                        <Col xs={24} sm={24} md={6}>
                {/* <PageHeader 
                onBack={()=>history.push("/app")}
                title={existing?"Update Exam":"New Exam"}/>  */}
                
            <Affix  offsetTop={10}>
                <div style={{padding:"10px"}}className="component-content">  
                <label>Examination Title</label>
                <Typography.Title level={2}>{title}</Typography.Title>
                       
                <Row>
                    <Statistic 
                    title="Time Remaining" 
                    valueStyle={timer&&timer.asMinutes()<10?{color:"red"}:null}
                    value={timer?timer.format("h [hrs], mm [min], ss [sec]"):"∞ hrs, ∞ mins, ∞ secs "}/>
                    <Button 
                    onClick={()=>submitAnswers()}
                    type="primary">Submit Answers</Button>
                    <Divider/>
                </Row>
                <Row>
                    <Col md={24}>                    
                    <Tree 
                    defaultExpandAll
                    showLine={true}
                    showIcon={true}
                    onSelect={(key)=>{
                        setCurrentQuestion(parseInt(key[0]&&key[0].split("-")[1]))}}
                    style={{width:"100%",backgroundColor:"none"}}
                    autoExpandParent={true}
                    >
                        
                        <Tree.TreeNode 
                            title={title+" Outline"} 
                            isStart={true} 
                            selectable={false}
                            key={"0"}
                            children={
                            examQuestions.length?examQuestions?.map((question,key)=>{
                                return <Tree.TreeNode  switcherIcon={<InfoCircleFilled/>} isLeaf={true} key={"0-"+key}  
                                title={String(question.title).slice(10).concat("...")}/>
                            }):<Spin/>
                        }/>
                        
                    </Tree>
                    </Col>
                </Row>
                </div>
            </Affix>
                
            </Col>
              <Col className="component-content" xs={24} sm={24} md ={16}>
                     <Question id={currentQuestion} {...examQuestions[currentQuestion]} answers={answers} setAnswer={setAnswers}/>
              </Col>
        </Row>
    )

}