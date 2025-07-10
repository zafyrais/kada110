import { useState } from "react"
import { useNavigate } from "react-router-dom";
export default function Group(){
    const [form, setForm] = useState({
        name:"",
        description:"",
        addMember:[],
    })
    const [email,setEmail] = useState('')
    const navigate = useNavigate()
    //create group
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:3000/api/group/post',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(form)
            })
            navigate('/')
            setForm({name:"",description:""});
        }catch(e){
            console.log(e)
        }

    }
    
    function handleCheck() {
        const validEmail = "zenahmad06@gmail.com"; // contoh valid email

        if (email === validEmail) {
            if (!form.addMember.includes(email)) { // cek agar tidak duplikat
                const updatedMembers = [...form.addMember, email];
                setForm({ ...form, addMember: updatedMembers });
                setEmail('')
                alert("Email berhasil ditambahkan.");
                
            }else{
                alert('email sudah ada')
            }
        }else{
            alert("Email tidak ditemukan.");
        }

    }

    
    return (
        <>
            <div className="group-container" style={{backgroundColor:"#e0f7fa"}}>
                <h1> Create Group</h1>
                <form onSubmit={handleSubmit}>
                    <div className="box">
                        <label>Name</label>
                        <input
                            required
                           value={form.name}
                           onChange={(e) => setForm({...form,name:e.target.value})}
                        />
                    </div>
                    <div className="box">
                        <label>Description</label>
                        <textarea
                            required
                            value={form.description}
                            onChange={(e) => setForm({...form,description:e.target.value})}
                        ></textarea>
                    </div>
                    <div className="box">
                        <label>add Member</label>
                         <input
                            required
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