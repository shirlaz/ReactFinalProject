import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import './Massages.scss';
import Chart from '../Chart/Chart';
import MySpinner from '../my-spinner/my-spinner';

interface MassageProps { }

const Massages: FC<MassageProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [list, setList] = useState<any>([]);
  const filterList = list.filter((message: any) => message.userId === parseInt(userId || '0'));
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setList(response.data);
      setLoad(true);
    });
  }, []);

  var index = 1;

  return (
    <div className="row">
      <div className="col-sm-6">
        <Chart />
      </div>
      <div className="col-sm-6">
        <h5>Messages for user number {userId}:</h5>
        {load ? (
          filterList.length ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>body</th>
                </tr>
              </thead>
              <tbody>
                {filterList.map((message: any) => (
                  <tr key={message.id}>
                    <td>{index++}</td>
                    <td>{message.title}</td>
                    <td>{message.body}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>This user has no messages yet</p>
          )
        ) : (
          <MySpinner />
        )}
      </div>
    </div>
  );
};

export default Massages;
