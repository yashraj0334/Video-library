import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export function UserRegister()
{

    let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{UserId:'',UserName:'',Password:'',Email:'',Mobile:''},

        onSubmit:(user)=>{
            axios.post('http://127.0.0.1:3030/register-user', user)
            .then(()=>{
                alert('User Registered Successfully')
                navigate('/video-library-home');
            })
        }
    })

    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <h3 className="bi bi-person-circle text-center mb-4"> User Registration</h3>
                <dl>
                    <dt>UserID</dt>
                    <dd><input type="text" className="form-control" name="UserId" placeholder="Enter UserID" onChange={formik.handleChange} /></dd>
                    <dt>UserName</dt>
                    <dd><input type="text" className="form-control" name="UserName" placeholder="Enter UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" name="Password" placeholder="Enter Password" onChange={formik.handleChange} /></dd>
                    <dt>Email</dt>
                    <dd><input type="text" className="form-control" name="Email" placeholder="Enter Email" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" className="form-control" name="Mobile" placeholder="Enter Mobile" onChange={formik.handleChange} /></dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>
    )
}