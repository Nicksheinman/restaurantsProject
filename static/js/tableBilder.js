var move=false
var countTable=1
var countTableBig=1
var countTableHuge=1
function setTable(id){
    var table = document.querySelector('.'+id);
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
        t.className='table'+countTable
        let id=t.id='table'+countTable
        t.setAttribute('src', '/static/img/table.png' )
        t.addEventListener('click', function() {setTable(id)})
        t.addEventListener('drag', function() {deleteElement(id)})
        document.getElementById("ordinaryTables").appendChild(t)
        countTable=countTable+1
    }
    if (num==2){
        let t=document.createElement('img')
        t.className='tableBig'+countTableBig
        let id=t.id='tableBig'+countTableBig
        t.setAttribute('src', '/static/img/big_table.png' )
        t.addEventListener('click', function() {setTable(id)})
        t.addEventListener('drag', function() {deleteElement(id)})
        document.getElementById("bigTables").appendChild(t)
        countTableBig=countTableBig+1
    }
    if (num==3){
        let t=document.createElement('img')
        t.className='tableHuge'+countTableHuge
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