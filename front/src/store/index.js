import { createStore } from 'redux';

const intitialState={
    workers:[],
    name:"",
    hours:"",
    pic:""
}

const reducer=( state=intitialState , action )=>{
    console.log('reducer', state)
    switch(action.type){
        case "HANDLE_CHANGE":

           return Object.assign({},state, {[action.name]:action.payload})

        case "ADD_TO_LIST":

           return Object.assign({},state, {workers:[action.payload].concat(state.workers) , name:"",hours:"",pic:""})
        case "ADD_FULL_LIST":

            let fullList=Object.assign({},state, {workers:state.workers.concat(action.payload)})
            fullList.workers.map((worker)=>worker.isActive=false)
           return fullList    

        case "DELETE_BY_INDEX":     

            let updated= state.workers.slice() 
            updated.splice(action.payload,1);
            return Object.assign({},state, {workers:updated})

        case "UPTADE_BTN_STATE":

            let updatedBtn= Object.assign({},state);
            updatedBtn.workers[action.payload].isActive=!updatedBtn.workers[action.payload].isActive
            return updatedBtn

        case "UPDATE_BY_ID":
            let updatedByID= Object.assign({},state, {name:"",hours:"",pic:""});
            updatedByID.workers[action.payload.index]=action.payload
            delete updatedByID.index
            return updatedByID

        default: 
          return state;
    }
}
 
const store= createStore(reducer)

export default store
