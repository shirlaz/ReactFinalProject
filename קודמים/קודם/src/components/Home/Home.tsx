import { FC } from 'react';
import './Home.scss';
interface HomeProps { }

const Home: FC<HomeProps> = () => (
  <div className="Home">
    <h1>tic tac toe game</h1>
  </div>
);


export default Home;