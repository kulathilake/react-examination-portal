import React from 'react';
import {  Input, Typography, } from 'antd';

export default ({title,answer,})=>(
  <Input.Group>
  <Typography.Title level={4}>Question</Typography.Title>
      <Typography.Text strong >{title}</Typography.Text>
      <Typography.Title level={4}>Candidate Answer</Typography.Title>
    <Typography.Text>{answer}</Typography.Text><br/>
  </Input.Group>
)