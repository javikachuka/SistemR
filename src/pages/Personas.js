import React from 'react'
import { List, message, Spin } from 'antd';
import NavBar from '../components/NavBar';
import PersonaList from '../components/PersonaList';

const Personas = ({loading, datos, handleClickDelete, handleChangeButton}) => {
    return ( 
        <>
            <NavBar/>
            <Spin spinning={loading} delay={500}>
                <PersonaList personas={datos} onClickDelete={handleClickDelete} onChangeButton={handleChangeButton}  />
            </Spin>
        </>
     );
}
 
export default Personas;