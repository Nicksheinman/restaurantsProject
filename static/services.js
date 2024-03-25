let HOST='http://127.0.0.1:5000/api/services'

function axiosTest() {
    axios.get(HOST).then((r)=>(console.log(r.data)))
}

//axiosTest()

function CreateTable(){
    const [tables, setTable]=React.useState([])
    React.useEffect(() => {
        axios.get(HOST).then((response) => {
          setTable(response.data.tables);
        });
      });
    return (
        <div className='tables'>
            {Array.from(tables)[0]}
        </div>
    )
}


const tables = ReactDOM.createRoot(document.getElementById("main"));
tables.render(<CreateTable/>)
