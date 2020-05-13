import React from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { withFirebase } from '../../firebase';
import { Result, message } from 'antd';
import Loader from '../loader/loader';


class ViewExamComponent extends React.Component{
    constructor({firebase,...rest}){
        super()
        this.firebase = firebase;
        this.id = rest.id
        this.state={
            loading:true,
            action_message:"Loading Examination"
        }
    }

    componentWillUnmount(){
        if(this.firebase.getUser.isAnonymous){
            this.firebase.signOut();
        }
    }
    componentDidMount(){
        // if(!this.firebase.getUser()){
        //     this.firebase.candidateSignIn().then(user=>{
        //         console.log(user)
        //     })
        // }
        console.log(this.id)
        this.firebase.fetchExamTitle(this.id).then(res => {
            if(res.data()){
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
                                        this.timer = setInterval(()=>{
                                            this.timeGate()
                                            this.setState((state)=>({
                                                timer: moment.duration(moment(this.state.to).subtract(moment()))
                                            }))
                                        },1000)
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
            this.setState({OPEN:true
            })
            if(this.state.timer&&this.state.timer.asMinutes()<=10){
                message.info("You Have 10 Mins Remaining")
                clearInterval(this.timer)
            }
            return true
        }
        else{
            this.setState({
                AFTER:true,
                OPEN:false
            })
            return false
        }
    
    }

    

    render(){
    if(this.state.OPEN)return <p>{this.state.timer&&this.state.timer.format("h [hrs], mm [min], ss [sec]")}</p>;
    if(this.state.NOT_FOUND)return <Result status="error" title="404" subTitle="Examination does not exist!!"/>
    if(this.state.BEFORE) return <Result status="info" title="Examination Has not begun yet"/>
    if(this.state.AFTER) return <Result status="info" title="Examination Has Finished"/>
    if(this.state.loading) return <Loader message={this.state.action_message}/>
    }

}

export default withFirebase(ViewExamComponent);