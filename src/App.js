import Header from './MyComponents/Header'
import Footer from './MyComponents/Footer'
import Todos from './MyComponents/Todos'
import Login from './MyComponents/Authentication/Login';
import  { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Mobiles from './MyComponents/StoreType/Mobiles';
import Forgotpassword from './MyComponents/Authentication/Forgotpassword';
import Signup from './MyComponents/Authentication/Signup';
import Orders from './MyComponents/MyOrders/Orders';
import MyProfile from './MyComponents/Authentication/MyProfile';

function App() {
  const token = sessionStorage.getItem('accessToken');

  // if(!token) {
  //   return <Login />
  // }
  let logout=false;
  let registerLogin=false;
  if(token) {
    logout=true;
    registerLogin=false;
  }
  else{
    logout=false;
    registerLogin=true;
  }

  return (
    <Router>
       <Header title="small store" searchBar={true} logout={logout} registerLogin={registerLogin}/>
      <Routes>
        <Route exact path='' element={<Todos/>}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route path='/todos' element={<Todos />}></Route>
        <Route path='/mobiles' element={<Mobiles/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/profile' element={<MyProfile/>}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword/>}></Route>
      </Routes>
       <Footer/>
    </Router>
  );
}

export default App;