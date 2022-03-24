import React from 'react';
import {
    Link,
    Redirect,
    Route,
    Switch
    } from 'react-router-dom';

import "../Style/Header.css";

import GameInterface from './GameInterface';
import TreeInterface from './Tabs/TreeInterface';
import WordBankInterface from './Tabs/WordBankInterface';
import SettingInterface from './Tabs/SettingInterface';


class HeaderBar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            selectedTab: 0
        }
    }

    generateNavigationTab(){

        let tabs = ["Learn", "Word Bank", "Setting"];
        let htmlElem = [];

        for (let i = 0; i < tabs.length; i++) 
            htmlElem.push((
                <a id={(this.state.selectedTab) ? "selectedTab-Header": "unselectedTab-Header"} href="#">{tabs[i]}</a>
            ));

        return htmlElem;
    }

    render(){

        return(
            <div id="barContenair-Header">

                <h1>
                    Hder
                </h1>

                <nav>
                <ul>
                <li> <Link to="/Learn">Learn</Link> </li>
                <li> <Link to="/WordBank">Word Bank</Link> </li>
                <li> <Link to="/Setting">Setting</Link> </li>
                </ul>
                    
                </nav>

                <div>
                    <label for="course">Select Course</label>
                    <select name="course" id="course-Header">
                        <option>Darija</option>
                        <option>Kabyle</option>
                    </select>
                </div>

                <div className="routage">
                    <Switch>
                        <Route exact path="/" component={TreeInterface}/>
                        <Route path="/Learn" component={TreeInterface}/>
                        <Route path="/WordBank" component={WordBankInterface}/>
                        <Route path="/Setting" component={SettingInterface}/>

                        <Redirect to="/"/>
                    </Switch>
                
                </div>

            </div>
        );
    }
}

export default HeaderBar;


