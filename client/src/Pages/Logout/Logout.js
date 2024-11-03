import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../axios/instance';
import { useDispatch } from "react-redux";
import { setAuth } from '../../redux/actions';


function Logout()
{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() =>
    {
        const logout = async () =>
        {
            try
            {
                const res = await logoutUser();
                if (res.status === 200)
                {
                    dispatch(setAuth(false));
                    navigate("/signin");
                }
                else
                {
                    throw new Error("Could not logout the user.")
                }
            }
            catch (err)
            {
                console.log(err)
            }
        }
        logout();

    }, [navigate])
    return (
        <div className="logout">
            Logging you out...
        </div>
    )
}

export default Logout;
