import 'Style/App.css';
import React from 'react';


import HeaderBar from './Component/HeaderBar';
import {Table, TYPE} from './CourseData/Table';
import GameInterface from './Component/GameInterface';

class App extends React.Component {
  render(){
    return (
      <div className="App" style={appStyle}>
        <GameInterface table={Table}/>
      </div>
    );
  }

}

export default App;

const appStyle = {
  height: "100%",
  padding: "0",
}
