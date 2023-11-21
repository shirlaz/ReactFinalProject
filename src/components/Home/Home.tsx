import axios from 'axios';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './Home.scss';
import MySpinner from '../my-spinner/my-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
  const { idLink } = useParams<{ idLink: string }>();
  const [list, setList] = useState<any>([]);
  const filterList = list.filter((message: any) => message.userId === parseInt(idLink || '0'));
  const [load, setLoad] = useState<boolean>(false);
  const [showFlag, setShowFlag] = useState(false);
  function show() {
    setShowFlag(!showFlag);
  }
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setList(response.data);
      setLoad(true);
    });
  }, []);

  var index = 1;

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validate: (values) => {
      const errors: any = {};
      if (!values.title) {
        errors.title = '*Required';
      }
      if (!values.body) {
        errors.body = '*Required';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      AddMessage(values);
      resetForm();
    },
  });

  const AddMessage = (values: { title: string; body: string }) => {
    if (formik.isValid) {
      if (window.confirm("Are you sure you want to add this message?")) {
        const newMessage = {
          userId: parseInt(idLink || '0'),
          id: list.length + 1,
          title: values.title,
          body: values.body,
        };
        setList([newMessage, ...list]);
      }
    }
  };
  const allStore = useSelector((store: StoreType) => store)
  const _disptach = useDispatch();
  return (
    <div className="Home">
      <div className="showName">Hello {allStore.userReducer.firstName}</div>
      <div className="row">
        <div className="col-sm-6">
          {load ? (
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
            <MySpinner />
          )}
        </div>
        <div className="col-sm-6">
          <br></br>
          <Button onClick={show}>Add a message</Button>
          <br></br><br></br><br></br>
          {showFlag ?
            <form onSubmit={formik.handleSubmit}>
              <h3>title:</h3>
              <input className='title'
                type="text"
                name="title"
                value={formik.values.title}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
              <h3>body:</h3>
              <textarea
                name="body"
                value={formik.values.body}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="body"
                wrap="soft"
              />
              {formik.touched.body && formik.errors.body && <div>{formik.errors.body}</div>}
              <div>
                <Button type="submit">Add</Button>
              </div>
            </form>
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
