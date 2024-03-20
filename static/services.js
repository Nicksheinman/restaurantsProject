function getApi(){
    let api=axios.get("/api/services")
    return api
}

console.log(getApi())