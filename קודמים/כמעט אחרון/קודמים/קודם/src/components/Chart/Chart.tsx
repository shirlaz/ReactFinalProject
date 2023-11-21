import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './Chart.scss';
import axios from 'axios';
import MySpinner from '../my-spinner/my-spinner';

interface ChartProps { }

const Chart: FC<ChartProps> = () => {
  const [List, setList] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate(); // Add this line

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setList(response.data);
      setLoad(true);
    });
  }, []);
  const goToMassages = (UserId: any) => {
    navigate(`/main-page/7/messages/${UserId}`);
  };
  return (
    <div>
      {load ? (
        <div className="Chart">
          <Table striped bordered hover>
            <thead>
              <br></br><br></br>
              <tr>
                <th>username</th>
                <th>email</th>
                <th>User code</th>
              </tr>
            </thead>
            <tbody>
              {List.map((s: any) => (
                <tr key={s.id}>
                  <td onClick={() => goToMassages(s.id)}>{s.username}</td>
                  <td>{s.email}</td>
                  <td>{s.id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <MySpinner />
      )}
    </div>
  );
};

export default Chart;
