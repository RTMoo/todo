import NavElem from './NavElem';
import { useNavigate } from "react-router-dom";
import api from '../api'
import { REFRESH_TOKEN } from '../constants';

const Nav = () => {
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await api.post('/api/accounts/logout/',
                {"refresh": localStorage.getItem(REFRESH_TOKEN)}
            )
            localStorage.clear()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="flex flex-col w-60 bg-sky-100 h-screen px-4 fixed mr-60">
            <div className="py-3 px-2 font-medium text-md">
                {email}
            </div>
            <NavElem title='Создать' onClick={() => navigate('/?view=create')} />
            <NavElem title='Задачи' onClick={() => navigate('/?view=list')} />
            <NavElem title='Выйти' onClick={() => logout()} />
        </nav>
    );
};

export default Nav;
