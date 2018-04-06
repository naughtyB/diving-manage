import React from 'react';
import { Route } from "react-router-dom";
import PracticeList from './practiceList.js';

export class AppContentPageManagePractice extends React.Component{
  render(){
    return (
      [
        <Route
          key="practiceList"
          exact
          path='/pageManage/practice' 
          render={({history,location})=>{
            return <PracticeList
              history={history}
              location={location}
            />
          }}
        />
      ]
    )
  }
}

export default AppContentPageManagePractice;