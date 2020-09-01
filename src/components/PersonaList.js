import React from 'react';
import { Table, Button, Space, Popconfirm, Row, Input } from 'antd';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PersonaList = ({personas , onClickDelete, onChangeButton }) => {


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            align: 'center'
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            key: 'apellido',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Direccion',
            dataIndex: 'direccion',
            key: 'direccion',
            align: 'center'
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            aling: 'center',
            render: (persona) => (
                <>
                <Space size="small">
                    <Link to={'personas/edit/'+persona.key}>
                        <Button type="primary" size="small">Editar</Button>
                    </Link>
                    <Popconfirm title="Estas seguro?" onConfirm={() => { onClickDelete(persona.key) }}>
                        <Button type="primary" danger size="small" >Borrar</Button>
                    </Popconfirm>
                </Space>
                </>
            ),
        },
    ];

    const dataSource=[];
console.log(personas.length)

    if(personas.length != 0){

        personas.map(
            (persona)=>{
                var p = {
                    key: persona.id,
                    nombre: persona.nombre,
                    apellido: persona.apellido,
                    email: persona.email,
                }
                if( persona.direcciones[0] != null){
                    let aux = persona.direcciones
                    let direccionCompleta = null
                    aux.map(
                        (a) => {
                            direccionCompleta = a.localidad.localidad + ', (' + a.provincia.provincia + ' - ' + a.pais.pais + ')'
                        }
                    )
                    p = {
                        ...p,
                        direccion: direccionCompleta 
                        
                    }
                }else{
                    p = {
                        ...p ,
                        direccion: 'sin direccion'
                    }
    
                }
                dataSource.push(p)
            }
        )
    }

    const pressKey = (e) => {
        console.log(e)
    }


    return ( 
        <>
            <Card style={{ width: '100%' }} >
                <Card.Title>
                    <Space size="middle">
                        <h5 className="ml-5">
                        Listado de Personas
                        </h5> 
                        <Link to={'/personas/new'}>
                            <Button type="primary" size="small">Nuevo</Button>
                        </Link>
                    </Space>
                </Card.Title>
                <Card.Body>
                    <Row style={{}}>
                        <Input
                            placeholder="Busque"
                            onChange={onChangeButton}
                        />
                    </Row>
                    <Table dataSource={dataSource} columns={columns} size="middle"/>
                </Card.Body>
            </Card>
        </>
     );
}
 
export default PersonaList;