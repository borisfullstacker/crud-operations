import React, { Component } from 'react'
import { Table } from 'reactstrap';
import {connect} from 'react-redux'
import { Button, FormGroup, Label, Input } from 'reactstrap';
import {deleteById,updateById} from '../httpRequests/apiRequests'
import store from '../store/index'
import './style.css'

 class View extends Component {
 constructor(props){    
     super(props)  
 }
    render(){
      console.log("in render",this.props)
      return (
      <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Hours</th>
            <th>Pic</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>

    {this.props.workers.map((worker,index)=>
   {    return(
                    <tr key={index}  className={worker.isActive? "openEdit":"closeEdit"}>
                            <th scope="row">{index+1}</th>
                            <td>             
                             <Input type="text" name="name" onChange={this.props.handleValueChange} placeholder={worker.name} value={this.props.name}/> 
                            </td>
                            <td>
                            <Input type="text" name="hours"  onChange={this.props.handleValueChange} placeholder={worker.hours} value={this.props.hours}/> 
                           </td>
                            <td><img src={worker.pic}  width={63}/></td>
                            <td>    
                              <Button style={{width:"fit-content"}} onClick={this.props.deleteByIdFromApi.bind(this,{id:worker._id,index:index})}>Delete</Button>
                              <Button style={{width:"fit-content"}} onClick={this.props.update.bind(this,index)} > Update</Button>
                            </td>
                    </tr>        
    )}) }
    </tbody>

      </Table>
      </div>  
    )
  }

  componentDidMount(){
     this.unsub= store.subscribe(()=>{
          this.setState({})
      })
  }

  componentWillUnmount(){
      this.unsub();

  }
}

const mapStateToProps=(state)=>{
     console.log("mapStateToProps",state)
     return{
        workers:state.workers
     }
}

const mapDispatchToProps=(dispatch)=>{

  return{
    deleteByIdFromApi:(obj)=>{
        deleteById(obj.id).then(()=>{
          dispatch({
               type:"DELETE_BY_INDEX",payload:obj.index
           })
        }); 
    },
    
    update: (index)=>{
      let obj= Object.assign({},store.getState());
      let _id=obj.workers[index]._id;
      obj.pic= obj.workers[index].pic
      delete obj.workers

      if (obj.name.length!==0 && obj.hours.length!==0){
         updateById(_id,obj);
         obj.index=index;
         dispatch({type:"UPDATE_BY_ID",payload:obj})
      }else{
        alert("change input")
      }
      dispatch({
        type:"UPTADE_BTN_STATE",payload:index
      });
    }
    
    
    ,handleValueChange:(e)=>{
       const action= {type:"HANDLE_CHANGE", payload:e.target.value, name:e.target.name}
     dispatch(action)
    }

  }


}


export default connect(mapStateToProps,mapDispatchToProps)(View);