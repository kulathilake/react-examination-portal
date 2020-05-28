import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, PageHeader, Col } from 'antd';

export default function(){
    const history  = useHistory()

    return <Row className="top-ribbon">
        <Col>
            <PageHeader 
            onBack={()=>history.goBack()}
            title="Public View" subTitle="This is how your candidates will see the examination. Please note that answers cannot be submitted from this view. "/>
            </Col>
        </Row>

}