import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './MainPage.scss';

interface MainPageProps { }

const MainPage: FC<MainPageProps> = () => {
  const myNavigate = useNavigate();
  const urlParams = useParams();
  const id = urlParams.idLink;

  const goToPage = (target: string) => {
    const newLink = `/main-page/${id}/${target}#`;
    myNavigate(newLink);
  };

  return (<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a onClick={() => { goToPage('') }} className="nav-link" href="#">Home </a>
          </li>
          <li className="nav-item">
            <a onClick={() => { goToPage('GameInstructions') }} className="nav-link" href="#">GameInstructions</a>
          </li>
          <li className="nav-item">
            <a onClick={() => { goToPage('TicTacToe') }} className="nav-link" href="#">StartGame</a>
          </li>
          <li className="nav-item dropdown">
          </li>
        </ul>
      </div>
    </nav>
    <Outlet></Outlet>

  </div>
  )
}
export default MainPage;
