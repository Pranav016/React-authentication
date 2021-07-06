import { useContext, useRef } from 'react';
import { AuthContext } from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);

	const submitHandler = (e) => {
		e.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;
		//add validation

		fetch(
			`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_WEB_KEY}`,
			{
				method: 'POST',
				body: JSON.stringify({
					idToken: authCtx.token,
					password: enteredNewPassword,
					returnSecureToken: false,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => {
				//assumption: always succeeds
				return res.json();
			})
			.then((data) => console.log(data))
			.catch((err) => alert(err.message));
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input
					type='password'
					id='new-password'
					ref={newPasswordInputRef}
					minLength='7'
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
