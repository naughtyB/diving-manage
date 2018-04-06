import React from 'react';
import ModifyCourse from './modifyCourse';
import { Route } from "react-router-dom";
import CourseTable from './courseTable.js';

export class AppContentPageManageCourse extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="app-scrollbar" style={{padding: '24px', margin: '24px 16px', backgroundColor: '#fff'}}>
        <Route
          key="course"
          exact
          path='/pageManage/course' 
          render={({history,location})=>{
            return <CourseTable
              history={history}
              location={location}
            />
          }}
        />
        <Route 
          key="modifyCourse"
          path='/pageManage/course/modify'
          render={({history,location})=>{
            return <ModifyCourse
              history={history}
              location={location}
            />
          }}
        />
      </div>
    )
  }
}

export default AppContentPageManageCourse;