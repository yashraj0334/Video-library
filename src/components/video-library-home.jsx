import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";
import { useFormik } from "formik";

export function RegisterLink()
{
    return(
        <Link to='/user-register' className="btn btn-primary">Register</Link>
    )
}

export function PasswordComponent()
{
    return(
        <div className="input-group">
            <input type="password" className="form-control" placeholder="Enter Your Password" />
            <button className="btn btn-danger" style={{width:'125px'}}>Continue <span className="bi bi-chevron-right"></span></button>
        </div>
    )
}

export function VideoLibraryHome()
{

    const[view,setView] = useState('');
    const[display,setDisplay] =useState({display:'block'})

    const formik = useFormik({
        initialValues:{UserId:'', UserName:'', Password:'', Email:'', Mobile:''},
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:3030/get-users`)
            .then(response => {
              var data = response.data.find(client=> client.Email===user.Email);
              if(data)
                {
                    setView(<PasswordComponent />)
                    setDisplay({display:'none'})
                }else{
                    setView(<RegisterLink />)
                    setDisplay({display:'none'})
                }
            })
        }
    })

    

    return(
        <div className="d-flex align-items-center justify-content-center" style={{height:'80vh'}}>
            <main className="text-center" >
                <h1>Watch Free Technology Videos</h1>
                <h3>Any where any time</h3>
                <div>
                    <form  onSubmit={formik.handleSubmit} style={display} >
                        <div className="input-group" >
                        <input type="email" required placeholder="Enter Your Email" onChange={formik.handleChange}  name="Email" className="form-control" />
                        <button type="submit" className="btn btn-danger">Get Started <span className="bi bi-chevron-right"></span></button>
                        </div>
                    </form>
                    <div className="mt-3">
                        {view}
                    </div>
                </div>
            </main>
        </div>
    )
}