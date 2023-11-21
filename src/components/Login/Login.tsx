import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/store';
import { User } from '../../types/User';

interface LoginProps { }

const Login: FC<LoginProps> = () => {
	const myNav = useNavigate();
	const [userIdValue, setLocalUserIdValue] = useState(''); // Define local userIdValue state

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			userId: '',
		},
		validate: (values) => {
			const errors: any = {};
			if (!values.firstName) {
				errors.firstName = '*Required';
			}
			if (!values.lastName) {
				errors.lastName = '*Required';
			}
			if (!values.email) {
				errors.email = '*Required';
			} else if (!/\S+@\S+\.\S+/.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.userId.trim()) {
				errors.userId = '*Required';
			}
			return errors;
		},
		onSubmit: (values) => {
			_disptach({ type: 'SET_USER', data: { firstName: values.firstName, lastName: values.lastName, email: values.email, userId: parseInt(values.userId) } as User })
			goToPage(parseInt(values.userId));
		},
	});

	const goToPage = (index: number) => {
		myNav(`/main-page/${index}`);
	};

	const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const userIdValue = event.target.value;
		setLocalUserIdValue(userIdValue);
	};
	const allStore = useSelector((store: StoreType) => store)
	const _disptach = useDispatch();
	return (
		<div className="container">
			<div className="screen">
				<div className="screen__content">
					<form className="login" onSubmit={formik.handleSubmit}>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="text"
								className="login__input"
								placeholder="First name"
								{...formik.getFieldProps('firstName')}
								onBlur={formik.handleChange}
								value={formik.values.firstName}
							/>
							{formik.touched.firstName && formik.errors.firstName && (
								<div className="login__error">{formik.errors.firstName}</div>
							)}
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-user"></i>
							<input
								type="text"
								className="login__input"
								placeholder="Last name"
								{...formik.getFieldProps('lastName')}
								onBlur={formik.handleChange}
								value={formik.values.lastName}
							/>
							{formik.touched.lastName && formik.errors.lastName && (
								<div className="login__error">{formik.errors.lastName}</div>
							)}
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-envelope"></i>
							<input
								type="email"
								className="login__input"
								placeholder="Email"
								{...formik.getFieldProps('email')}
								onBlur={formik.handleChange}
								value={formik.values.email}
							/>
							{formik.touched.email && formik.errors.email && (
								<div className="login__error">{formik.errors.email}</div>
							)}
						</div>
						<div className="login__field">
							<i className="login__icon fas fa-lock"></i>
							<input
								type="password"
								className="login__input"
								placeholder="User Id"
								{...formik.getFieldProps('userId')}
								onChange={handleUserIdChange}
								value={userIdValue}
								onBlur={formik.handleChange}
							/>

							{formik.touched.userId && formik.errors.userId && (
								<div className="login__error">{formik.errors.userId}</div>
							)}
						</div>
						<button type="submit" className="button login__submit">
							<span className="button__text">Log In Now</span>
							<i className="button__icon fas fa-chevron-right"></i>
						</button>
					</form>
					<div className="social-login">
						<div className="social-icons">
							<a href="#" className="social-login__icon fab fa-instagram"></a>
							<a href="#" className="social-login__icon fab fa-facebook"></a>
							<a href="#" className="social-login__icon fab fa-twitter"></a>
						</div>
					</div>
				</div>
				<div className="screen__background">
					<span className="screen__background__shape screen__background__shape4"></span>
					<span className="screen__background__shape screen__background__shape3"></span>
					<span className="screen__background__shape screen__background__shape2"></span>
					<span className="screen__background__shape screen__background__shape1"></span>
				</div>
			</div>
		</div>
	)
}

export default Login;