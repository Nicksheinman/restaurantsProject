function getApi(){
    let api=axios.get("/api/services");
    return api
}

function getTables() {
    api=getApi()
    return api;
}

console.log(getTables())