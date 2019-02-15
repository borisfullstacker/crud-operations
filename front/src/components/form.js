import store from  '../store/index'
import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import {addWorkerToDb} from '../httpRequests/apiRequests'



 function WorkerForm(props){
    return (
      <div>
           <Form>
                <FormGroup>
                    <Label for="name">name</Label>
                    <Input type="text" name="name" id="name" value={props.name} onChange={props.handleValueChange}/> 
                </FormGroup>
                
                <FormGroup>
                    <Label for="hours">hours</Label>
                    <Input type="text" name="hours" id="hours" value={props.hours} onChange={props.handleValueChange} /> 
                </FormGroup>
                
                <FormGroup>
                    <Label for="name">pic</Label>
                    <Input type="text" name="pic" id="pic" value={props.pic} onChange={props.handleValueChange}/> 
                </FormGroup>
                {/* <Button type="UPDATE" name="update">update</Button> */}
                <Button type="button" onClick={props.add}>add</Button>
            </Form>
       </div>
    )
  
}
function mapStateToProps(state){  
    console.log("mapStateToProps",state);
    return{
        name:state.name,
        hours:state.hours,
        pic:state.pic
 }
}
 
function mapDispatchToProps(dispatch){ 
    return{
    handleValueChange:(e)=>{
         const action= {type:"HANDLE_CHANGE", payload:e.target.value, name:e.target.name}
         dispatch(action)
    },
    add: async () =>{
        let objToSend= Object.assign({},store.getState())
        delete objToSend.workers
        let result = await addWorkerToDb(objToSend)
        dispatch({type:"ADD_TO_LIST", payload:result})
    }
    



    }

}





export default connect(mapStateToProps,mapDispatchToProps)(WorkerForm)