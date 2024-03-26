let HOST='http://127.0.0.1:5000/api/services'

function axiosTest() {
    axios.get(HOST).then((r)=>(console.log(r.data)))
}

//axiosTest()

function CreateTable(){
    const [tables, setTable]=React.useState([])
    React.useEffect(() => {
        axios.get(HOST).then((response) => {
            setTable(Array(response.data.tables)[0]);
        });
      }, []);
    return (
        <div className='tables'>
            {tables.map((tabble, index)=>(
                <form>
                    <div className='table' id={tabble}>
                        <button variant='outlined' className='orderbutton'>Order</button>
                    </div>
                </form>
            ))}
        </div>
    )
}


const tables=ReactDOM.createRoot(document.getElementById("main"));
tables.render(<CreateTable/>)