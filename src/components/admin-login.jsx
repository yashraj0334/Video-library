import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { useCookies } from "react-cookie";

export function AdminLogin()
{
    const[cookies, setCookie, removeCookie] = useCookies();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit: (admin)=>{
            axios.get("http://127.0.0.1:3030/get-admin")
            .then(resposne =>{
                if(admin.UserId === resposne.data[0].UserId && admin.Password === resposne.data[0].Password)
                {
                    setCookie('admin-id', admin.UserId);
                    navigate('/admin-dashboard');
                    window.location.reload();
                }else{
                    alert('Invalid UserId and Password');
                }
            })
        }
    })
    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'70vh'}}>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h2 className="bi bi-person-circle text-center"> Admin Login</h2>
                <dl>
                    <dt>User ID</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="text" name="Password" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}