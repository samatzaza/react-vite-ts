import { Routes, Route, Link } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import Detail from './page/Detail'
import AppNotif from './page/Notification'

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/notification" element={<AppNotif />} />
            </Routes>
        </div>
    )
}

export default AppRoute
