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
    
    // Firestore methods.
    fetchExamList = () => {
        return this.app.firestore().collection(`exams`).where("owner","==",this.getUser().email).get();
    }


  }
   
  export default Firebase;
