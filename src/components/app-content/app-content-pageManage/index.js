import React from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import AppContentPageManageHomepage from './app-content-pageManage-homepage/index.js';
import AppContentPageManageCourse from './app-content-pageManage-course/index.js';

export class AppContentPageManage extends React.Component{
  render(){
    return (
      <Switch>
        <Route 
          key="homepage"
          path='/pageManage/homepage'
          render={({history,location})=>{
            return <AppContentPageManageHomepage
              history={history}
              location={location}
            />
          }}
        />
        <Route 
          key="course"
          path='/pageManage/course'
          render={({history,location})=>{
            return <AppContentPageManageCourse
              history={history}
              location={location}
            />
          }}
        />
        <Redirect to={{
          pathname: '/pageManage/homepage'
        }}/>
      </Switch>
    )
  }
}

export default AppContentPageManage;