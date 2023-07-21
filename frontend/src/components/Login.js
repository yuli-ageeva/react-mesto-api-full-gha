import React, {useState} from 'react';
import LoginForm from "./LoginForm";

function Login({handleLogin}) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  };


  return (
    <LoginForm onSubmit={handleSubmit}
               onChange={handleChange}
               title={'Вход'}
               email={formValue.email}
               password={formValue.password}
               buttonName={'Войти'}
    />
  );
}

export default Login