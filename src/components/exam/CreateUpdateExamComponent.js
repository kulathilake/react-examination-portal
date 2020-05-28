import React from 'react';
import CreateUpdateExamPage from '../../pages/exam/CreateUpdateExamPage';
import uid from 'uid';
import { message
 } from 'antd';
import {withFirebase} from '../../firebase';
import moment from 'moment';
import Loader from '../loader/loader';

export class CreateUpdateExamComponent extends React.Component{
    constructor({firebase,params}){
        super()
        this.state = {
            examId:params.id||uid(10),
            title:null,
            date:null,
            start:null,
            duration:null,
            questions:[],
            candidates:[],
            examPolicy:{TIME:true}
        }
        this.firebase = firebase;

    }
    
    
    componentDidMount(){
        if(this.props.params.id){
            this.setState({
                existing:true,
                loading:true,
                action_message:"Loading Examination"
            })
            const queue = [
                this.firebase.fetchExamTitle(this.props.params.id).then(res=>
                    this.setState({
                        title:res.data().title,
                        action_message:"Loading Basic Information"
                    })),
                
                this.firebase.fetchExamPolicy(this.props.params.id).then(res=>
                    this.setState({
                        examPolicy:{...res.data()}
                    })
                ),    
                    
                this.firebase.fetchExamSchedule(this.props.params.id).then(res=>
                    {if(res.data()){
                        this.setState({
                            date:res.data().date
                                ?moment(res.data().date.toDate())
                                :null,
                            start:res.data().start
                                ?moment(res.data().start.toDate())
                                :null,
                            duration:res.data().duration
                                ?moment(res.data().duration.toDate())
                                :null,
                            action_message:"Loading Exam Schedule"        
                            })
                    }}
                    ),

                    this.firebase.fetchExamQuestions(this.props.params.id).then(res => {
                        this.setState({
                            questions: res.data().questions,
                            action_message: "Loading Questions"
                        })
                    }),

                    this.firebase.fetchExamCandidates(this.props.params.id).then(res => {
                        this.setState({
                            candidates: res.data().candidates,
                            action_message: "Loading Candidates"
                        })
                    })
                ]

            Promise.all(queue).then(()=>{
                this.setState({
                    loading:false
                })
            })
        };
    }
    
    
    componentDidUpdate(){
        if(this.state.action_progress){
            message.loading(this.state.action_message,0.5)
        }
    }
    
    handleSaveExamination = () => {
        this.setState({
            action_progress:true,
            action_message:"Saving Examination"
        })
        if(this.state.title){
            if(this.state.examPolicy.TIME&&!this.state.data&&!this.state.start){
                message.error("Exam Policy Requires Scheduling Details")
                return false
            }
            Promise.all([
               this.firebase.createExamination(this.state.examId,{title:this.state.title}),
               this.firebase.createExamQuestions(this.state.examId,{questions:this.state.questions}),
               this.firebase.createExamCandidates(this.state.examId,{candidates:this.state.candidates}),
               this.firebase.createExamPolicy(this.state.examId,this.state.examPolicy),
               this.state.examPolicy.TIME?this.firebase.createExamSchedule(this.state.examId,{
                   date:this.state.date?this.state.date.toDate():null,
                   start:this.state.start?this.state.start.toDate():null,
                   duration:this.state.duration?this.state.duration.toDate():null
                }):null
           ]).then(()=>{
               this.setState({
                   action_progress:false,
                   action_message:null
               },()=>{
                   if(this.props.params.id){
                       message.success("Successfully Updated Exam")
                   }else{
                    message.success("Successfully Created Exam")
                   }
               })
           }).catch((e)=>{
                console.log(e)
                message.error("Something went wrong!")})
        }else{
            this.setState({
                action_progress:false,
                action_message:null
            })
            message.error("Incomplete Details")
        }
    }

    setExamTitle = (title) =>{
        this.setState({
            title:title
        })}
    setExamDate = (Date) =>{
        this.setState(()=>({
            date:Date
        }))}
    setExamStartTime = (startTime) =>{
        this.setState(()=>({
            start: startTime
        }))}
    setExamDuration = (duration) =>{
        this.setState(()=>({
            duration:duration
        }))}
    setExamQuestions = (question) =>{
        this.setState((state)=>({
            questions: state.questions.concat(question)
        }),()=>{
            message.success("Question Added")
        })}
    setExamCandidates = (candidate) =>{
        this.setState((state)=>({
            candidates: [...state.candidates,candidate]
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
            questions: state.questions.filter(item=>{return item.id!==deleteid})
        }),()=>{
            message.success("Question Deleted")
        })
    }

    deleteExamCandidate = (deleteuid) =>{
        this.setState((state)=>({
            candidates: state.candidates.filter(item=>{return item.otp !== deleteuid})
        }),()=>{
            message.success("Candidate Deleted")
        })
    }

    updateExamQuestion = (id,title) => {
        this.setState((state)=>({
            questions: state.questions.filter(item=>{if(item.id===id){
                item.title = title;
            }
            return item
        })
            // .concat({id:id,title:title})
        }),()=>{
            message.success("Question Updated")
        })
    }

 
    render(){
        if(this.state.loading){
           return <Loader message={this.state.action_message}/>
        }
        console.log(this.state.questions)
        return(
                <CreateUpdateExamPage 
        id={this.state.examId}        
        examTitle = {this.state.title}
        examDate = {this.state.date}
        examStartTime = {this.state.start}
        examDuration = {this.state.duration}
        examQuestions = {this.state.questions}
        examCandidates = {this.state.candidates}
        examPolicy = {this.state.examPolicy}
        existing = {this.state.existing}
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
        handleSaveExamination = {this.handleSaveExamination}
        />
        )
    }   

}


export default withFirebase(CreateUpdateExamComponent)