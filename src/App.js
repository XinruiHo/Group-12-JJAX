
import Navbar from './components/Navbar.js';
import NFTList  from './components/NFTlistPage.js';
import UploadAuction from './components/UploadAuction.js';
import UploadList from './components/UploadList';
import { Layout, Typography,Space, Button } from 'antd';
import Image from "./bg.png"
import ConnectWallet from './utils/ConnectWallet.js'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const { Header, Content } = Layout;
const { Title } = Typography;


function App() {
  return (
    <Layout style={{ backgroundImage: "url(" + Image + ")", backgroundSize: 'cover'}}>
    <Header style={{ display: 'flex', alignItems: 'center' ,background: 'transparent'}}>
    <Space size={20}>
    <div style={{ marginRight: 'auto',fontSize: '24px' }}>JJAX</div>    
    <Link to="/" style={{ fontSize: '18px' }}>
            <Button type="link" style={{ color: 'blue' ,border: '3px solid black', color: 'black',fontWeight: 'bold'}}>
              NFT List
            </Button>
          </Link>
          <Link to="/UploadList" style={{ fontSize: '18px' }}>
            <Button type="link" style={{ color: 'blue' ,border: '3px solid black', color: 'black',fontWeight: 'bold'}}>
              Upload fixed Price NFT
            </Button>
          </Link>
          {/*<Link to="/UploadAuction" style={{ fontSize: '18px' }}>
            <Button type="link" style={{ color: 'blue' ,border: '3px solid black', color: 'black',fontWeight: 'bold'}}>
              Upload Acution
            </Button>
  </Link>}*/}
          <ConnectWallet/>
          </Space>
        </Header>
      
      <Content style={{ padding: '20px' ,minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<NFTList />}/>
          <Route path="/UploadList" element={<UploadList />}/>        
          {/*<Route path="/UploadAuction" element={<UploadAuction />}/>*/}     
        </Routes>
        </Content>
    
    </Layout>
  );
}

export default App;