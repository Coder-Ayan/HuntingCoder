import { useState } from 'react';
import style from '../styles/Contact.module.css';



const Contact = () => {
	const [credentials, setCredentials] = useState({ name: '', email: '', message: '' });

	const handleChange = (event) => {
		setCredentials({ ...credentials, [event.target.name]: event.target.value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/api/contact/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			});

			alert("Message sent successfully!");
		} catch (error) {
			alert("Failed to send message. Try again!");
		} finally {
			setCredentials({ name: '', email: '', message: '' })
		}
	}

	return (
		<div className={style.mainWrapper}>
			<form className={style.form} onSubmit={handleSubmit}>
				<div className={style.mb_5}>
					<label htmlFor="name" className={style.formLabel}>Full Name</label>
					<input type="text" name="name" id="name" placeholder="Full Name" value={credentials.name} onChange={handleChange} className={style.formInput} />
				</div>
				<div className={style.mb_5}>
					<label htmlFor="email" className={style.formLabel}>Email Address</label>
					<input type="email" name="email" id="email" placeholder="Email Address" value={credentials.email} onChange={handleChange} className={style.formInput} />
				</div>
				<div className={style.mb_5}>
					<label htmlFor="message" className={style.formLabel}>Message</label>
					<textarea name="message" id="message" placeholder="Message" value={credentials.message} onChange={handleChange} className={`${style.formInput} ${style.formTextArea}`} />
				</div>
				<button className={style.formBtn} type='submit'>Send Message</button>
			</form >
		</div >

	)
}

export default Contact