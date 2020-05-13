import React from 'react';
import { Spin, Result } from 'antd';

const Loader = ({message})=>(

    <Result icon={<Spin/>} subTitle={message}/>

)

export default Loader;