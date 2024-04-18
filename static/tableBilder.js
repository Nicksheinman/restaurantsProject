//var table = document.querySelector('.table');
var move=false
var count=1
function setTable(id){
    let search='.'+id
    var table = document.querySelector(search);
    if (move==false) {
        document.onmousemove = (event) => {
            var x = event.clientX*100/window.innerWidth+'%';
            var y = event.clientY*100/window.innerHeight+'%';
                table.style.transition = "0s";
                table.style.left = x;
                table.style.top = y;
                table.style.transform='translate';
            window['move']=true;
    }}
    else  {
        document.onmousemove= (event) => {
            table.style.transform='none'
        }
        window['move']=false;
    }
}

function createTable(num){
    if (num==1){
        let t=document.createElement('img')
        t.className='table'+count
        let id=t.id='table'+count
        t.setAttribute('src', 'table.png' )
        t.addEventListener('click', function() {setTable(id)})
        document.getElementById("tables").appendChild(t)
        count=count+1
    }
    if (num==2){
    }
}