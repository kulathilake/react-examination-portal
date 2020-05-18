import React from 'react';
import { message, Result, notification } from 'antd';
import Loader from '../loader/loader';
import GradeExainationPage from '../../pages/grade/GradeExaminationPage';
import email from '../../helpers/resultsEmail';

export default class GradeExaminationComponent extends React.Component{
    constructor({firebase,...rest}){
        super();
        this.id = rest.params.id;
        this.firebase = firebase;
        this.state = {
            title:null,
            questions:{},
            candidates:{},
            currentScript: {},
            marks:{},
            loading:true,
            action_message:"Loading Examination"
        }
    }


    componentDidMount(){
        //TODO
        if(this.id){
            this.firebase.fetchExamTitle(this.id).then(res=>{
                this.setState({
                    title:res.data().title,
                    action_message:"Loading Quetions"
                })
                this.firebase.fetchExamQuestions(this.id).then(res=>{
                    this.setState({
                        questions:res.data().questions,
                        action_message:"Loading Candidates"
                    })
                    this.firebase.fetchExamCandidates(this.id).then(res=>{
                        this.setState({
                            candidates:res.data().candidates,
                            action_message:null,
                            loading:false
                        },()=>{
                            this.setCurrentCandidate(this.state.candidates[0].email)
                        })
                    })
                })
                .catch(e=>{
                    message.error("Something went wrong, try reloading the page.")
                    throw e
                })
            })
            .catch(e=>{
                message.error("Something went wrong, try reloading the page.")
                throw e
            })
        }
    }

    setCurrentCandidate(email){
        if(this.state.is_unsaved){
            this.saveGrading();
            message.warn("Changes were autosaved")
        }
            this.setState({
                currentCandidate:email,
                marks:{},
                loading:true,
                action_message:"Loading Script"
            },()=>{

                this.getCurrentScript();
            })
        
    }

    getCurrentScript(){
        this.firebase.fetchCandidateAnswers(this.id,this.state.currentCandidate).then(res=>{
            if(res.exists){
                console.log(this.state.currentCandidate,res.data())
                this.setState({
                    currentScript:res.data(),
                    marks:res.data().marks?res.data().marks:{},
                    loading:false,
                    action_message:"Loading Script"
                })
            }else{
                message.info("This candidate has not submitted answers.")
                this.setState({
                    loading:false
                })
            }
        })
        .catch(e=>{throw e})
    }

    setMark(q,m){
        this.setState((state)=>({
            is_unsaved:true,
            marks:{...state.marks,[q]:m}
        }),()=>{
            console.log(this.state.marks)
        })
    }

    saveGrading(){
        this.firebase.createCandidateAnswers(this.id,this.state.currentCandidate,{...this.state.currentScript,marks:this.state.marks}).then(res=>{
            message.success("Successfully Saved Grading")
            this.setState({
                is_unsaved:false
            })
        })
        .catch(e=>{throw e})
    }
    
    

    publishResults(check,total){
        if(check){
            window.Email.send({
                SecureToken:"2a2e24d2-bc4a-403e-b676-7f4483d4b869",
                To : this.state.currentCandidate,
                From : "ActuatorApps@gmail.com",
                Subject : "Results of " + this.state.title,
                Body : email(this.state.title,total,this.firebase.getUser().email,new Date().toLocaleDateString())
            }).then(res=>{
                if(res==="OK"){
                    notification.success({
                        message:`Delivered to ${this.state.currentCandidate}`
                    })
                }else{
                    notification.error({
                        message:`Delivery failed to ${this.state.currentCandidate}`
                    })
                }
            }).catch((e)=>{
                message.error("Something went wrong!");
                throw e;
            })
        }
        else{
            message.warning("Complete Grading all the Questions before Publishing Results")
        }
    }
    
    render(){
         if(this.state.loading)return <Loader message={this.state.action_message}/>
         if(this.state.empty)return<Result/>
         return <GradeExainationPage
         title={this.state.title}
         questions={this.state.questions}
         candidates={this.state.candidates}
         currentScript={this.state.currentScript}
         currentCandidate={this.state.currentCandidate}
         setCurrentCandidate={this.setCurrentCandidate.bind(this)}
         marks={this.state.marks}
         setMark={this.setMark.bind(this)}
         saveGrading={this.saveGrading.bind(this)}
         publishResults={this.publishResults.bind(this)}
         />

    }
}