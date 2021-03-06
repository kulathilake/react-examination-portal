import React, { Suspense } from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom'
import Firebase,{FirebaseContext} from './firebase';
import {Layout} from 'antd'
import ProtectedRoutesWrapped from './wrappers/ProtectedRoutes';
import {HeaderWrapped} from './components/header/header';
import { GithubFilled } from '@ant-design/icons';
import Loader from './components/loader/loader';

const {Content, Header, Footer} = Layout
const LandingPageWrapped = React.lazy( ()=> import('./pages/landing/landingPage'));
const DashboardWrapped = React.lazy( ()=> import('./pages/dashboard/DashboardPage'));
const CreateUpdateExam = React.lazy( ()=> import('./components/exam/CreateUpdateExamComponent'));
const ViewExamination = React.lazy(( )=> import('./components/exam/ViewExamComponent'));
const GradeExamination = React.lazy(()=> import('./components/grading/GradeExaminationComponent'));
const ProfileComponent = React.lazy(()=> import('./components/profile/ProfileComponent'));
function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
            <Router>
      <div className="App">
          <Layout className="layout">
            {  true&&
            <Header style={{padding:"0px"}}>
              <HeaderWrapped/>
            </Header>
            }
            <Content>
            <div className="site-layout-content">
        <Suspense fallback={<Loader/>}>
                  <Switch>
                    <Route path="/" exact component={LandingPageWrapped} />
                    <Route path="/exam/:id" exact render={props=><ViewExamination {...props.match.params}/>} />
                    <Route path="/app" exact>
                        <ProtectedRoutesWrapped component={DashboardWrapped}/>
                    </Route>
                    <Route path="/app/exam/new" exact>
                        <ProtectedRoutesWrapped component={CreateUpdateExam}/>
                    </Route>
                    <Route path="/app/exam/update/:id" exact>
                        <ProtectedRoutesWrapped  component={CreateUpdateExam}/>
                    </Route>
                    <Route path="/app/exam/grade/:id" exact>
                        <ProtectedRoutesWrapped  component={GradeExamination}/>
                    </Route>
                    <Route path="/app/profile/:uid?" exact>
                        <ProtectedRoutesWrapped  component={ProfileComponent}/>
                    </Route>
          
                  </Switch>
        </Suspense>
              </div>
            </Content>
            <Footer className="site-layout-footer">ActutatorXMS ©{new Date().getFullYear()} <br/><GithubFilled/> <a href="http://www.github.com/shehankule">shehankule</a>
            <br/>
            <div>
            <a href="https://www.freepik.com/free-photos-vectors/banner">Banner vector created by freepik - www.freepik.com</a>
            </div>
            </Footer>
          </Layout>
      </div>
              </Router>
    </FirebaseContext.Provider>
  );
}

export default App;
