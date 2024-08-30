import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"


export function UserLogin()
{
    let navigate = useNavigate(); 
    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit:(user)=>{
            axios.get('http://127.0.0.1:3030/get-users')
            .then(response =>{
                var data = response.data.find(item => item.UserId === user.UserId);
                if(data)
                {
                    if(data.Password === user.Password)
                    {
                        navigate('/user-dashboard');
                    }else
                    {
                        navigate('/user-error');
                    }
                }else{
                    navigate('/user-error');
                }
            })
        }
    })

    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
            <form onSubmit={formik.handleSubmit} className="w-25">
                <h3 className="bi bi-person-fill text-center mb-3"> User Login</h3>
                <dl>
                    <dt>UserID</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="text" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Login In</button>
            </form>
        </div>
    )
}