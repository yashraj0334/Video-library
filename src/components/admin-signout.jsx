import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";


export function Signout()
{
    const[cookies, setCookies, removeCookies] = useCookies('admin-id');
    let navigate = useNavigate();

    function handleSignoutClick()
    {
        removeCookies('admin-id');
        navigate('/');
        window.location.reload();
    }
    return(
        <div>
            <button onClick={handleSignoutClick} className="btn btn-primary">Signout</button>
        </div>
    )
}