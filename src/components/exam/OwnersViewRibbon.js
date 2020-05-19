import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, PageHeader } from 'antd';

export default function(){
    const history  = useHistory()

    return <Row className="top-ribbon">
            <PageHeader 
            onBack={()=>history.goBack()}
            title="Public View" subTitle="This is how your candidates will see the examination "/>
        </Row>

}