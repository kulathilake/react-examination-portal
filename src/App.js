import React, { Suspense } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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
function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <div className="App">
          <Layout className="layout">
            <Header style={{padding:"0px"}}>
              <HeaderWrapped/>
            </Header>
            <Content>
            <div className="site-layout-content">
        <Suspense fallback={<Loader/>}>
              <Router>
                  <Switch>
                    <Route path="/" exact component={LandingPageWrapped} />
                    <Route path="/exam/view/:id" exact component={LandingPageWrapped} />
                    <Route path="/app" exact>
                        <ProtectedRoutesWrapped component={DashboardWrapped}/>
                    </Route>
                    <Route path="/app/exam/new" exact>
                        <ProtectedRoutesWrapped component={CreateUpdateExam}/>
                    </Route>
                  </Switch>
              </Router>
        </Suspense>
              </div>
            </Content>
            <Footer className="site-layout-footer">ActutatorXMS ©{new Date().getFullYear()} <br/><GithubFilled/> <a href="http://www.github.com/shehankule">shehankule</a></Footer>
          </Layout>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
