import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import {useDispatch} from 'react-redux'
export default function FormUpdate(){
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    //ambil param di url
    const{id} = useParams()
    const navigate = useNavigate();
    const [data,setData] = useState({
        name:"",
        description:"",
        addMember:[],
    })
    //ambil data dan masukan ke input
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(`http://localhost:3000/api/group/${id}`);
                if (!res.ok){
                    throw new Error('not found')
                }
                const dat = await res.json();
                setData(dat)
                
            } catch (error) {
                console.log(error)
            }
            
        }
        getData();
    },[id])
    // update
    async function handleUpdate(e){
        e.preventDefault();
        try{
            const res = await fetch(`http://localhost:3000/api/group/${id}`,{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(data)
            })
            navigate('/')
            setData({name:"",description:""});
            console.log(res)
        }catch(e){
            console.log(e)
        }


    }
    function handleCheck() {
        const validEmail = "zenahmad06@gmail.com"; // contoh valid email
        const members = data.addMember || []; // kalai undefined

         if (email === validEmail) {
            if (!members.includes(email)) {
                const updatedMembers = [...members, email];
                setData({ ...data, addMember: updatedMembers });
                setEmail('');
                alert("Email sudah ditambahkan.");
            } else {
                alert("Email sudah ada.");
            }
        } else {
            alert("Email tidak ditemukan.");
        }

    }
    return(
        <>
            <div className="group-container" style={{backgroundColor:'#e0f7fa'}}>
                <h1> Update Group</h1>
                <form onSubmit={handleUpdate}>
                    <div className="box">
                        <label>Name</label>
                        <input
                            required
                           value={data.name}
                           onChange={(e) => setData({...data,name:e.target.value})}
                        />
                    </div>
                    <div className="box">
                        <label>Description</label>
                        <textarea
                            required
                            value={data.description}
                            onChange={(e) => setData({...data,description:e.target.value})}
                        ></textarea>
                    </div>
                      <div className="box">
                        <label>add Member</label>
                         <input
                            
                            className="inputEmail"
                            type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <button className="addMember" type="button" onClick={handleCheck}>+</button>
                    </div>
                    <div><button className="submitBtn" type="submit">submit</button></div>
                </form>
            </div>
        </>
    )
}