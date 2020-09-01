import React from 'react';
import NavBar from '../components/NavBar';
import PersonaForm from '../components/PersonaForm'
import { Button, Row, Col, message } from 'antd';

const PersonaNew = ({handleChange, handleChangePais, handleChangeProvincia, handleChangeLocalidad, personaForm, direccion, handleSubmit, formRef}) => {
    return ( 
        <>
        <NavBar/>
        <Row className="justify-content-center mt-4">
            <Col span={2}></Col>
            <Col span={8}>
                <PersonaForm
                    onChange={handleChange}
                    onChangePais={handleChangePais}
                    onChangeProvincia={handleChangeProvincia}
                    onChangeLocalidad={handleChangeLocalidad}
                    form={personaForm}
                    direccion={direccion}
                    onSubmit={handleSubmit}
                    formuRef={formRef}
                />
            </Col>

        </Row>
        </>
     );
}
 
export default PersonaNew;
