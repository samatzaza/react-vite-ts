import AppRoute from './Approute';
import Home from './page/Home'
import TableInput from './components/TableInput'
import "./index.css"
import 'antd/dist/reset.css';  // Import Ant Design's default styles

function App() {
  return (
    <div>
      {/* <Home /> */}
      {/* <TableInput /> */}
      <AppRoute />
    </div>
  )
}

export default App
