import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Space, Switch } from 'antd';
import { AuthContext } from '../../context/auth-context/AuthContext';
import "../controles.css"

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// const initialState = {
//       userId: null,
//       username: null, 
//       token: null,
//       refreshToken: null,
// }
const initialState = {        
        username: null, 
        password:null
  }

const FormLogin = ({handleCloseModal, setIsRegister}) => { 
  const [user, setUser] = useState(initialState)
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const {login} = useContext(AuthContext);

  const base_url = "https://metaverso.griftin.com.ar/app/v1";

  const fetchLogin = useCallback(
    async() => {
      setisLoading(true);
      try {
        const res = await fetch(`${base_url}/users/login`, {
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        console.log("RES EN LOGIN", res)

        if (!res.ok) {
          const message = `Error al obtener token: ${res.status}`;
          throw new Error(message);
        }
        const data = await res.json();
        //const userToken = data.token
        console.log("Respuesta login",data)
        
        
        // const newAuthState = {
        //   logged: true,
        //   username: data.username,
        //   token: userToken,
        //   idUser: data.user__id
        // }
        //accion de login en el contexto
        //login({type: types.login, payload: newAuthState})        
        //guardamos el estado de login en el localStorage
        //localStorage.setItem("authState", JSON.stringify(newAuthState))


        setSuccess(true);
        setInterval(() => {
          setSuccess(false);
          handleCloseModal(false);
        }, 1000);
        
      } catch (error) {
        console.log(error)
      }finally {
        setisLoading(false);
        handleCloseModal(false);
      }
      
    },
    [user],
  )

const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value
  })
  console.log(user)
}

  const handleSubmit = (e) => {
    //e.preventDefault();    
    console.log("data del formulario",user)
    fetchLogin();

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



return (
  <div className="modal-content">
    <h3 style={{textAlign: "center"}}>Formulario de Login</h3>
    <Form 
      name="loginForm"
      title='Login'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete='off'
      onFinish={handleSubmit}
      onFinishFailed={onFinishFailed}
      >

<Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <input
          className="input"
          type="text"
          placeholder="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
           />
    </Form.Item>
    
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <input
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>


    <Form.Item
      name="changeMode"
      valuePropName="exist"
      wrapperCol={{
        offset: 3,
        span: 16,
      }}
    >
        <Space direction="vertical">
            <span>No tiene Cuenta?</span>
            <Switch defaultChecked checkedChildren="register" unCheckedChildren="login" onChange={() => {setIsRegister(true)}} />

        </Space>
    </Form.Item>


    </Form>
  </div>
  )
};

export default FormLogin;