import { Link,Outlet } from "react-router-dom";
function Navbar(){
    return(<>
        <nav className="bg-gray-600 p-4 text-white flex space-x-8 ">
                <div className="font-bold text-xl">Riding Club</div>
                <div className="space-x-4">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    
                </div>
       </nav>
       <Outlet />

    </>
    );
}

export default Navbar;