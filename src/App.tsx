
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import TicTacToe from './components/TicTacToe/TicTacToe';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import MainPage from './components/MainPage/MainPage';
import Home from './components/Home/Home';
import GameInstructions from './components/GameInstructions/GameInstructions';
import Login from './components/Login/Login';
import Chart from './components/Chart/Chart';
import Massages from './components/Massages/Massages';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from './redux/store';
import { Suspense } from 'react';
function App() {
  const allStore = useSelector((store: StoreType) => store)
  const _disptach = useDispatch();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/main-page/:idLink" element={<MainPage></MainPage>} >
          <Route path="" element={allStore.userReducer.userId == 7 ? <div className="col-sm-6"><Chart /> </div> : <Home />}></Route>
          <Route path="GameInstructions" element={<GameInstructions></GameInstructions>}></Route>
          <Route path="TicTacToe" element={<Suspense fallback={<div>loadding TicTacToe game....</div>}><TicTacToe></TicTacToe></Suspense>}></Route>
          <Route path="/main-page/:idLink/:messages/:userId" element={<div className='Mass'><Massages></Massages></div>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
