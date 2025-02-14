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
import SearchTable from './page/searchtable'
import AntTable from './page/AntTable'
import MainLayout from './layout/MainLayout'

function AppRoute() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<MainLayout><Home /></MainLayout>} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/detail" element={<MainLayout><Detail /></MainLayout>} />
                <Route path="/notification" element={<MainLayout><AppNotif /></MainLayout>} />
                <Route path="/pdf" element={<MainLayout><PdfGenerator /></MainLayout>} />
                <Route path="/pr-form" element={<MainLayout><PurchaseOrderForm /></MainLayout>} />
                <Route path="/map" element={<MainLayout><GoogleMap /></MainLayout>} />
                <Route path="/chart" element={<MainLayout><MyBarChart /></MainLayout>} />
                <Route path="/button" element={<MainLayout><Button /></MainLayout>} />
                <Route path="/datatable" element={<MainLayout><DataTable /></MainLayout>} />
                <Route path="/searchtable" element={<MainLayout><SearchTable /></MainLayout>} />
                <Route path="/anttable" element={<MainLayout><AntTable /></MainLayout>} />
            </Routes>
        </div>
    )
}

export default AppRoute
