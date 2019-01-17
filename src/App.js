import React, { Component } from 'react';
import './App.css';
import * as Survey from 'survey-react';

Survey.StylesManager.applyTheme("bootstrap");

const initSurvey = {
  title: "Example survey with loop functions for SSRL",
  pages: [{
    name: "page1",
    questions: [{
      type: "radiogroup",
      choices: ["Yes", "No"],
      isRequired: true,
      name: "visibleChoice",
      title: "Do you want the looping questions visible?"
    },]
  },]
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { surveyJSON: {}, loopNum: 0 }
    this.sendDataToServer = this.sendDataToServer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    let surveyJSON = JSON.parse(JSON.stringify(initSurvey));
    this.setState({ surveyJSON: surveyJSON })
  }
  handleChange(event) {
    this.setState({ loopNum: event.target.value })
  }
  handleClick() {
    var temSurveyJSON = JSON.parse(JSON.stringify(initSurvey));
    for (let i = 0; i < this.state.loopNum; i++) {
      let loopQuestion1 = {
        type: "checkbox",
        choices: ["Click Me", "No, Click Me"],
        hasOther: true,
        isRequired: true,
        name: "loopQA" + (i + 1).toString(),
        title: "looping question A loop" + (i + 1).toString(),
        visibleIf: "{visibleChoice} = 'Yes'"
      }
      let loopQuestion2 = {
        type: "checkbox",
        choices: ["Do not Click Me", "Click Above"],
        hasOther: true,
        isRequired: true,
        name: "loopQB" + (i + 1).toString(),
        title: "looping question B loop" + (i + 1).toString(),
        visibleIf: "{visibleChoice} = 'Yes'"
      }
      temSurveyJSON.pages[0].questions.push(loopQuestion1);
      temSurveyJSON.pages[0].questions.push(loopQuestion2);
    }
    let newSurveyJSON = temSurveyJSON;
    this.setState({ surveyJSON: newSurveyJSON }, function (){
      alert("You are all set, please answer the first question to check it out!")
    })
  }
  sendDataToServer() {
    alert("This is only a demo, the data need to be sent to server!")
  }
  render() {
    return (
      <div className="App container">
        <header>
          <h1><a href="https://github.com/coreyAbout/surveyLoopExample">What does it do?(click to check the source code)</a></h1>
          <p>You specify a loop number in the box and click the button right beside it. 
            There will be two quesitons repeated according to that number after you clicked yes to the first quesiton.</p>
        </header>
        <div id="getLoop">
          <span className="text-lg">Please type in the nubmer of loops you want: </span>
          <input type="number" min="0" max="100" step="1" onChange={this.handleChange}></input>
          <button type="button" className="btn btn-primary" onClick={this.handleClick}> Click to try it out!</button>
        </div>
        <Survey.Survey json={this.state.surveyJSON} onComplete={this.sendDataToServer} />,
      </div>
    );
  }
}

export default App;



