import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div>
            <nav className='flex justify-between p-3 w-full bg-blue-300 text-white '>
                <div>
                    Appname
                </div>
                <ul className='flex justify-evenly w-1/2'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
