import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import AppContentPageManage from './app-content-pageManage/index.js';

export class AppContent extends React.Component{
  render(){
    return (
      <Switch>
        <Route 
          key="pageManage"
          path='/pageManage'
          render={({history,location})=>{
            return <AppContentPageManage
              history={history}
              location={location}
            />
          }}
        />
        <Redirect to={{
          pathname: '/pageManage'
        }}/>
      </Switch>
    )
  }
}

export default AppContent;