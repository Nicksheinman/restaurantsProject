var table = document.querySelector('.table');
function setTable(){
    document.onmousemove = (event) => {
        var x = event.clientX*100/window.innerWidth+'%';
        var y = event.clientY*100/window.innerHeight+'%';
        
            table.style.transition = "0s";
            table.style.left = x;
            table.style.top = y;
            table.style.transform='translate'
        console.log(x)
    }
}