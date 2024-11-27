var move=false
var countTable=1
var countTableBig=1
var countTableHuge=1
function setTable(id){
    var table = document.querySelector('#'+id);
    if (move==false) {
        document.onmousemove = (event) => {
            var x = event.clientX*100/window.innerWidth+'%';
            var y = event.clientY*100/window.innerHeight+'%';
                table.style.transition = "0s";
                table.style.left = x;
                if (Number(y.slice(0,-1))>10){
                    table.style.top = y;}       
                table.style.transform='translate'
            window['move']=true;
    }}
    else  {
        document.onmousemove= () => {
            table.style.transform='none'
        }
        window['move']=false;
    }
}

function createTable(num){
    if (num==1){
        let t=document.createElement('img')
        t.className='table'
        let id=t.id='table'+countTable
        t.setAttribute('src', '/static/img/table.png' )
        t.addEventListener('click', function() {setTable(id)})
        t.addEventListener('drag', function() {deleteElement(id)})
        document.getElementById("ordinaryTables").appendChild(t)
        countTable=countTable+1
    }
    if (num==2){
        let t=document.createElement('img')
        t.className='tableBig'
        let id=t.id='tableBig'+countTableBig
        t.setAttribute('src', '/static/img/big_table.png' )
        t.addEventListener('click', function() {setTable(id)})
        t.addEventListener('drag', function() {deleteElement(id)})
        document.getElementById("bigTables").appendChild(t)
        countTableBig=countTableBig+1
    }
    if (num==3){
        let t=document.createElement('img')
        t.className='tableHuge'
        let id=t.id='tableHuge'+countTableHuge
        t.setAttribute('src', '/static/img/huge_table.png' )
        t.addEventListener('click', function() {setTable(id)})
        t.addEventListener('drag', function() {deleteElement(id)})
        document.getElementById("hugeTables").appendChild(t)
        countTableHuge=countTableHuge+1
    }
}

function deleteElement(id) {
    document.getElementById(id).remove()
}

axios.defaults.headers.common = {
    "Content-Type": "application/json"
  }

function saveTables() {
    let rName=document.getElementById('rName').value
    if (rName.length>0){
        let  oTable=document.querySelectorAll('.table')
        let orTable=[]
        oTable.forEach((table)=>{
            let a=table.getAttribute('style')
            let b=table.getAttribute('id')
            let c={'id':b,'style':a}
            orTable.push(c)
        })
        let  bTable=document.querySelectorAll('.tableBig')
        let biTable=[]
        bTable.forEach((table)=>{
            let a=table.getAttribute('style')
            let b=table.getAttribute('id')
            let c={'id':b,'style':a}
            biTable.push(c)
        })
        let  hTable=document.querySelectorAll('.tableHuge')
        let huTable=[]
        hTable.forEach((table)=>{
            let a=table.getAttribute('style')
            let b=table.getAttribute('id')
            let c={'id':b,'style':a}
            huTable.push(c)
        })
        let picture=document.getElementById('downloadImage').files[0];
        let formData= new FormData();
        formData.append("picture",picture);
        let allTables= {'restaraunt_name' :rName, 'tables':{'ordinaryTables':orTable, 'bigTables':biTable, 'hugeTables':huTable}}
        let result=axios.post('http://127.0.0.1:5000/api/saveTable', allTables)
        let resultI=axios.post('http://127.0.0.1:5000/api/saveTable', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(result.data)
        console.log(resultI.data)
    }
        
    else {alert("Please enter name for your restaraunt")}
}

function loadTables() {
    let rName=document.getElementById('rName').value
    if (rName.length>0){
        axios.get('http://127.0.0.1:5000/api/saveTable', {params:{'rName':rName}}).then((response) => {
            console.log(response.data);
        });
        }
    else {alert("Please enter name for restaraunt you want to load")}
}

function viewImage(input) {
    let file=input.files[0]
    let reader= new FileReader() ;
    reader.readAsDataURL(file);
    reader.onload=function(e){
        document.getElementById('backgroundImage').src=e.target.result;
    }
}