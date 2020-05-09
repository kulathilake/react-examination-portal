import React from 'react';
import CreateUpdateExamPage from '../../pages/exam/CreateUpdateExamPage';
import uid from 'uid';
import { message } from 'antd';

export default class CreateUpdateExamComponent extends React.Component{
    constructor({id,title,...rest}){
        super()
        this.state = {
            examId:id||uid(10),
            examTitle:title,
            examDate:null,
            examStartTime:null,
            examDuration:null,
            examQuestions:[],
            examCandidates:[],
            examPolicy:{TIME:true}
        }

    }
    
    componentDidMount(){
        
    }
    
    setExamTitle = (title) =>{
        this.setState({
            examTitle:title
        })}
    setExamDate = (Date) =>{
        this.setState(()=>({
            examDate:Date
        }))}
    setExamStartTime = (startTime) =>{
        this.setState(()=>({
            examStartTime: startTime
        }))}
    setExamDuration = (duration) =>{
        this.setState(()=>({
            examDuration:duration
        }))}
    setExamQuestions = (question) =>{
        this.setState((state)=>({
            examQuestions: state.examQuestions.concat(question)
        }),()=>{
            message.success("Question Added")
        })}
    setExamCandidates = (candidate) =>{
        this.setState((state)=>({
            examCandidates: [...state.examCandidates,candidate]
        }),()=>{
            message.success("Candidate Added")
        })}  
    
    setExamPolicy = (name,value) => {
        let newPolicy = Object.assign({},this.state.examPolicy);
        newPolicy[name] = value;
        this.setState((state)=>({
            examPolicy: newPolicy
        }),()=>{
            console.log(this.state.examPolicy)
            message.success("Exam Policy Updated")})
    }    

    deleteExamQuestion = (deleteid) =>{
        this.setState((state)=>({
            examQuestions: state.examQuestions.filter(item=>{return item.id!==deleteid})
        }),()=>{
            message.success("Question Deleted")
        })
    }

    deleteExamCandidate = (deleteuid) =>{
        this.setState((state)=>({
            examCandidates: state.examCandidates.filter(item=>{return item.otp !== deleteuid})
        }),()=>{
            message.success("Candidate Deleted")
        })
    }

    updateExamQuestion = (id,title) => {
        this.setState((state)=>({
            examQuestions: state.examQuestions.filter(item=>{return item.id!==id}).concat({id:id,title:title})
        }),()=>{
            message.success("Question Updated")
        })
    }
        
    render(){
        return(
                <CreateUpdateExamPage 
        examTitle = {this.state.examTitle}
        examDate = {this.state.examDate}
        examStartTime = {this.state.examStartTime}
        examDuration = {this.state.examDuration}
        examQuestions = {this.state.examQuestions}
        examCandidates = {this.state.examCandidates}
        examPolicy = {this.state.examPolicy}
        setExamTitle = {this.setExamTitle}
        setExamDate = {this.setExamDate}
        setExamStartTime = {this.setExamStartTime}
        setExamDuration = {this.setExamDuration}
        setExamQuestions = {this.setExamQuestions}
        setExamCandidates = {this.setExamCandidates}
        setExamPolicy = {this.setExamPolicy}
        deleteExamQuestion = {this.deleteExamQuestion}
        deleteExamCandidate ={this.deleteExamCandidate}
        updateExamQuestion = {this.updateExamQuestion}
        />

  )
    }   

}