var table = document.querySelector('.table');
var move=false
function setTable(){
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
        let t=document.createElement('div')
        t.className='table1'
        let  b=document.createElement('button')
        b.innerText='hello'
        b.addEventListener('click', setTable)
        document.getElementById("main").appendChild(t)
        document.getElementById("main").appendChild(b)
    }
}