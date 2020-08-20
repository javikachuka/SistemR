import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from 'antd';

export default class CardPage extends React.Component {
    
    render(){
        return (
            <Card title="Mi primer card" extra={<a href="#">+</a>} style={{ width: 500 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        );
    }
}