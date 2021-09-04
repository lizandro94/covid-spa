import React, { useEffect } from 'react';
import { MehOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom"
import { Button } from 'antd';
import './styles.scss'

const NotFound = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.className = 'body-not-found';
  }, []);

  const goHome = () => {
    document.body.className = '';
    history.push("/");
  }

  return (
    <main className="main-not-found">
      <h1>4<span><MehOutlined /></span>4</h1>
      <h2>Error: 404 page not found</h2>
      <p>Sorry, the page you're looking for cannot be accessed</p>
      <Button type="link" onClick={goHome}>Go Home</Button>
    </main>
  );
};

export default NotFound;