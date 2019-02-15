
export function addWorkerToDb(worker){
    return fetch('http://localhost:3000',{
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             "Accept":"application/json"
         },
         body: JSON.stringify(worker)
     }).then((res)=>{return res.json()})
       .then((res)=>{return res})
}

export function getFullWorkerList(){
    return fetch('http://localhost:3000',{
       }).then((res)=>{return res.json()})
         .then((res)=>{return res;})
}

export function deleteById(id){
    return fetch(`http://localhost:3000/${id}`,{
        method:"DELETE"
    },{
       }).then((res)=>{return res.json()})
         .then((res)=>{return res;})
}

export function updateById(id,data){
    return fetch(`http://localhost:3000/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data)
    },{
       }).then((res)=>{return res.json()})
         .then((res)=>{return res;})
}

