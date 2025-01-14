import { Routes, Route, Link } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import Detail from './page/Detail'
import AppNotif from './page/Notification'
import PdfGenerator from './components/pdf'
import PurchaseOrderForm from './page/PRForm'

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/notification" element={<AppNotif />} />PurchaseOrderForm
                <Route path="/pdf" element={<PdfGenerator />} />
                <Route path="/pr-form" element={<PurchaseOrderForm />} />

            </Routes>
        </div>
    )
}

export default AppRoute
