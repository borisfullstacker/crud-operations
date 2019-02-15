import React, { Component } from 'react';
import './App.css';
import View from './components/view';
import WorkerForm from './components/form';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {getFullWorkerList} from './httpRequests/apiRequests'
import { connect } from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Router>
      <div >
        <Container>   
        <h1>Crud operation</h1>
           <header>
              <ul>
                <Link to="/view"><li>View and edit</li></Link>
                <Link to="/form"><li>Add new worker</li></Link>
              </ul>
           </header>
             <Route exact path="/" component={WorkerForm} />
             <Route  path="/form" component={WorkerForm} />
             <Route  path="/view" component={View} />
        </Container>
       </div>
      </Router>

    );
  }

  componentDidMount(){
     this.props.get()
  }


}


const mapDispatchToProps=(dispatch)=>{
    return{
      get:async()=>{
        console.log(getFullWorkerList)
        let result= await getFullWorkerList();
        dispatch({type:"ADD_FULL_LIST", payload:result});
      }
    }
}



export default connect(null,mapDispatchToProps)(App);
