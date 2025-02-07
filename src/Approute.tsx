import { Routes, Route, Link } from 'react-router-dom'
import Home from './page/Enhanment/Home'
import About from './page/About/About'
import Detail from './page/Report/Detail'
import AppNotif from './page/About/Notification'
import PdfGenerator from './components/pdf'
import PurchaseOrderForm from './page/Enhanment/PRForm'
import GoogleMap from './page/GoogleMap'
import MyBarChart from './components/graph'
import Button from './page/button'
import DataTable from './page/DataTable'

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/detail" element={<Detail />} />
                <Route path="/notification" element={<AppNotif />} />
                <Route path="/pdf" element={<PdfGenerator />} />
                <Route path="/pr-form" element={<PurchaseOrderForm />} />
                <Route path="/map" element={<GoogleMap />} />
                <Route path="/chart" element={<MyBarChart />} />
                <Route path="/button" element={<Button />} />
                <Route path="/datatable" element={<DataTable />} />
            </Routes>
        </div>
    )
}

export default AppRoute
