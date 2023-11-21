import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import './Chart.scss';
import axios from 'axios';
import MySpinner from '../my-spinner/my-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

interface ChartProps { }

const Chart: FC = () => {
  const [List, setList] = useState<any>([]);
  const [load, setLoad] = useState<boolean>(false);
  const navigate = useNavigate();
  const [, setUsername] = useState('');
  const [, setEmail] = useState('');
  const [showFlag, setShowFlag] = useState(false);
  function show() {
    setShowFlag(!showFlag);
  }
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      setList(response.data);
      setLoad(true);
    });
  }, []);
  const goToMassages = (UserId: any) => {
    navigate(`/main-page/7/messages/${UserId}`);
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.username) {
        errors.username = '*Required';
      }
      if (!values.email) {
        errors.email = '*Required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      AddUser(values);
      resetForm();
    },
  });
  let num = List.length + 1;
  const AddUser = (values: { username: string; email: string }) => {
    if (formik.isValid) {
      if (window.confirm("Are you sure you want to add this user?")) {
        const newUser = {
          username: values.username,
          email: values.email,
          id: 0,
        };
        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
          .then((response) => {
            const newUserData = { ...response.data, id: num };
            num = num + 1;
            setList([...List, newUserData]);
            setUsername('');
            setEmail('');
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const allStore = useSelector((store: StoreType) => store)
  const _disptach = useDispatch();
  return (
    <div>
      <div>
        <div className="showName">Hello {allStore.userReducer.firstName}</div>
        {load ? (
          <div className="Chart">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>username</th>
                  <th>email</th>
                  <th>User code</th>
                </tr>
              </thead>
              <tbody>
                {List.map((s: any) => (
                  <tr key={s.id}>
                    <td className='user' onClick={() => goToMassages(s.id)}>{s.username}</td>
                    <td>{s.email}</td>
                    <td>{s.id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div>
            <br></br><br></br>
            <MySpinner />
          </div>
        )}
      </div>
      <div>
        <Button onClick={show}>Add a user</Button>
        <br></br><br></br><br></br>
        {showFlag ?
          <form onSubmit={formik.handleSubmit}>
            <h3>username</h3>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username && <div>{formik.errors.username}</div>}
            <h3>email</h3>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            <div>
              <br></br>
              <Button type="submit">Add</Button>
            </div>
          </form>
          : null}
      </div>
    </div>
  );
};

export default Chart;
