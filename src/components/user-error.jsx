import { Link } from "react-router-dom";


export function UserError()
{
    return(
        <div className="d-flex justify-content-center">
            <div className="text-center mt-5">
                <h2 className="text-danger">Invalid Crediential</h2>
                <Link to='/user-login' className="">Try Again</Link>
            </div>
        </div>
    )
}