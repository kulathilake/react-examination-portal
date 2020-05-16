import React from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { withFirebase } from '../../firebase';
import { Result, message, Row, Input, Col, Button, notification } from 'antd';
import Loader from '../loader/loader';
import ViewExaminationPage from '../../pages/exam/ViewExaminationPage';
import { LockFilled } from '@ant-design/icons';

class ViewExamComponent extends React.Component{
    constructor({firebase,...rest}){
        super()
        this.firebase = firebase;
        this.id = rest.id
        this.state={
            loading:true,
            action_message:"Loading Examination",
            candidate_email:"",
            candidate_otp: "",
            examQuestions:[],
            answers:{}
        }
    }


    componentDidMount(){
        setTimeout(()=>{
            if(!this.firebase.getUser()){
                message.info("Authenticating Application")
                this.firebase.candidateSignIn().then(user=>{
                    document.location.reload()
                })
            }
        },2000)

        this.firebase.fetchExamTitle(this.id).then(res => {
            if(res.data()){
                if(res.data().delete) {this.setState({NOT_FOUND:true}); return null}
                this.setState({title:res.data().title,action_message:"Loading Examination Schedule"})
                this.firebase.fetchExamSchedule(this.id).then(res=>
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
                            },()=>{
                                this.setState((state)=>({
                                    from: state.date&&state.start
                                        ?moment().date(state.date.date()).hour(state.start.hour()).minute(state.start.minute())
                                        :null,
                                    to: state.date&&state.start&&state.duration
                                        ?moment().date(state.date.date()).hour(state.start.hour()+state.duration.hour()).minute(state.start.minute()+state.duration.minute())
                                        :null
                                }),()=>{

                                    if(this.timeGate()){
                                        this.setState({
                                            credentialModal:true
                                        })
                                        // this.credentialCheck()
                                    }
                                })
                            })
                    }}
                )
                .catch(e=>{
                    
                    throw e;
                })
            }
            else{
               this.setState({NOT_FOUND:true,loading:false})
            }
        }).catch(e => {throw e})
    }
    
    /**
     * @todo Implement websockets to listen to an ntdp
     */
    timeGate(){
        if(moment().isBefore(this.state.from)){
            this.setState({
                OPEN:false,
                BEFORE:true
            })
            return true;
        }
        if(moment().isBetween(this.state.from,this.state.to)){

            // if(this.state.timer&&this.state.timer.asMinutes()<=10){
            //     message.info("You Have 10 Mins Remaining")
            // }
            return true
        }
        else{
            clearInterval(this.timer)
            this.setState({
                AFTER:true,
                OPEN:false
            })
            return false
        }
    
    }

    /**
     * @todo open up modal to get email and otp
     */
    credentialCheck(){
        this.firebase.candidateCredentialCheck(this.id,this.state.candidate_email,this.state.candidate_otp).then(res=>{
            console.log(res)
            if(res){
              
                this.timer = setInterval(()=>{
                    this.timeGate()
                    this.setState((state)=>({
                        timer: moment.duration(moment(this.state.to).subtract(moment())),
                    }))
                },1000)
                this.setState({
                    OPEN:true,
                    UNAUTH:false,
                    credentialModal:false
                },()=>{
                    this.loadQuestions();
                })
            }else{
                this.setState({
                    OPEN:false,
                    UNAUTH:true,
                    credentialModal:false
                })
            }
        })
        this.setState({
            action_message:"Checking Credentials"            
        }) 
    }

    loadQuestions(){
        if(!this.state.UNAUTH&&this.state.OPEN){
            this.firebase.fetchExamQuestions(this.id).then(res => {
                this.setState({
                    examQuestions:res.data().questions
                })
            })
            .catch(e=>{
                message.error("Something went wrong, try reloading the page.")
                throw e
            })
        }
        else{
            return null
        }
    }

    handleCredentials(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        })
    }

    setAnswers(answers){
        this.setState({
            answers:answers
        })
    }
    submitExamination(){
        this.firebase.createCandidateAnswers(this.id,this.state.candidate_email,this.state.answers).then(res=>{
            console.log(res)
            notification.success({
                message:"Your Answers have been successfully submitted"
            })
            this.firebase.invalidateCandidate(this.id,this.state.candidate_email,this.state.candidate_otp).then(res=>{
                console.log(res);
                notification.info({
                    message:"Your OTP is now expired, and can no longer be used to access this examination",
                    onClose :() => {
                        this.setState({
                            OPEN:false,
                            AFTER:true
                        })
                    }
                    
                })
            })
        })
    }



    

    render(){
    if(this.state.credentialModal)return <Row justify="center">

            <Col md={8} className="component-content" style={{padding:"10px"}}>
                <Row>
                    <Result
                        status="info"
                        title="Provide your email and OTP"
                        icon={<LockFilled/>}
                        subTitle={<p>This examination can only be accessed by Candidates who have been registered by the examination owner.</p>}
                    />
                        <Input
                        name="candidate_email"
                        onChange={(e)=>this.handleCredentials(e)}
                        placeholder="Your Email"/>
                        <Input.Password
                        name="candidate_otp"
                        onChange={(e)=>this.handleCredentials(e)}
                        placeholder="Your OTP"/>
                        <Button 
                        onClick={()=>this.credentialCheck()}
                        type="primary">OK</Button>
                </Row>
                
        
                <Row justify="center">
                <small>
                <p>
                    If your OTP does not work, chances are, your candidacy may have been revoked by the owner of this examination. <br/>
                    If you did not recieve an Email, 
                    <ul>
                        <li>You may be unauthorized to view and attempt this examination</li>
                        <li>Or Something went wrong with the delivery of that email.</li>
                    </ul>
                    In any case, please contact the examination owner.
                </p>
                </small>
                </Row>
            </Col>
    
        </Row>
    if(this.state.UNAUTH) return <Result status="error" title="Unauthorized" subTitle={<Button onClick={()=>{
        this.setState({
            credentialModal:true
        })
    }}>Retry</Button>}/>    
    if(this.state.OPEN)return <ViewExaminationPage 
        title={this.state.title}
        timer={this.state.timer&&this.state.timer.format("h [hrs], mm [min], ss [sec]")}
        examQuestions = {this.state.examQuestions}
        credentialsModal={this.state.credentialModal}
        answers={this.state.answers}
        setAnswers={this.setAnswers.bind(this)}
        submitAnswers={this.submitExamination.bind(this)}
        />
    
    if(this.state.NOT_FOUND)return <Result status="error" title="404" subTitle="Examination does not exist!!"/>
    if(this.state.BEFORE) return <Result status="info" title="Examination Has not begun yet"/>
    if(this.state.AFTER) return <Result status="info" title="Examination Has Finished"/>
    if(this.state.loading) return <Loader message={this.state.action_message}/>
    }

}

export default withFirebase(ViewExamComponent);