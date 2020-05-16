import firebase from 'firebase/app';
import  'firebase/auth';
import 'firebase/firestore'
import dev from './config';

class Firebase {
    constructor() {
      this.app = firebase.initializeApp(dev);
      this.auth = firebase.auth()
    }

    getUser = () =>{
        return this.auth.currentUser    
    }

    signInWithRedirect = () =>{
        return this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    }

    signOut = () =>{
        return this.auth.signOut()
    }

    candidateSignIn = () => {
        return this.auth.signInAnonymously();
    }
    
    // Firestore methods.
    // Create
    createExamination = (id,data) => {
        return this.app.firestore().collection(`exam`).doc(id).set({...data,owner:this.getUser().uid,delete:false}); 
    }

    createExamSchedule = (id,schedule) =>{
        return this.app.firestore().collection(`exam-schedule`).doc(id).set({...schedule,owner:this.getUser().uid});
    }

    createExamPolicy = (id,policies) => {
        return this.app.firestore().collection(`exam-policy`).doc(id).set({...policies,owner:this.getUser().uid});
    }

    createExamQuestions = (id,questions) => {
        return this.app.firestore().collection(`exam-questions`).doc(id).collection(`questions`).doc(`data`).set({...questions});
    }  

    createExamCandidates = (id,candidates) => {
        return this.app.firestore().collection(`exam-candidates`).doc(id).set({...candidates,id:id,owner:this.getUser().uid});
    }

    createCandidateAnswers = (id,email,answers) => {
        return this.app.firestore().collection(`candidate-answers`).doc(id).collection(`answers`).doc(email).set(answers);
    }

    // Retrieve
    fetchExamList = () => {
        return this.app.firestore().collection(`exam`).where("owner","==",this.getUser().uid).where("delete","==",false).get();
    }

    fetchExamTitle = (id) => {
        return this.app.firestore().collection(`exam`).doc(id).get();
    }

    fetchExamSchedule = (id) => {
        return this.app.firestore().collection(`exam-schedule`).doc(id).get();
    }

    fetchExamPolicy = (id) => {
        return this.app.firestore().collection(`exam-policy`).doc(id).get();
    }

    fetchExamQuestions = (id) => {
        return this.app.firestore().collection(`exam-questions`).doc(id).collection(`questions`).doc(`data`).get();
    }

    fetchExamCandidates = (id) =>{
        return this.app.firestore().collection(`exam-candidates`).doc(id).get();
    }

    fetchCandidateAnswers = (id,email) => {
        return this.app.firestore().collection(`candidate-answers`).doc(id).collection(`answers`).doc(email).get()
    }
    

    candidateCredentialCheck = (id,email,otp) => {
        return this.app.firestore().collection(`exam-candidates`)
        .where("id","==",id)
        .where("candidates","array-contains",{email:email,otp:otp}).get().then(res=>{
            if(res.empty){
                return false
            }
            else{
                return true
            }
        })
    }

    invalidateCandidate = (id,email,otp) => {
        return this.app.firestore().collection(`exam-candidates`)
        .doc(id).update({
            candidates: firebase.firestore.FieldValue.arrayRemove({email:email,otp:otp})
        }).then(
            res=>{
                return res
            }
        )  
    }

    // Update
    updateExamination = ({id,data}) => {
        //TODO
    }

    updateExamSchedule = ({id,schedule}) =>{
        //TODO
    }

    updateExamPolicy = ({id,policies}) => {
        //TODO
    }

    updateExamQuestions = (id,questions) => {
        //TODO
    } 

    updateExamCandidates = (id,candidates) => {
        //TODO
    }

    //Delete
    deleteExamination = (id) => {
        return this.app.firestore().collection(`exam`).doc(id).update({delete:true})
    }

  }
   
  export default Firebase;
