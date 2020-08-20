import React from 'react';
import { Form, Input, Button } from 'antd'
import { Select } from 'antd';
import Axios from 'axios';

const { Option } = Select;

const posicionForm = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 20,
    },
};
const posicionBotton = {
    wrapperCol: { offset: 5, span: 8 },
};


class PersonaForm extends React.Component {

    
    
    onSearch(val) {
        console.log('search:', val);
    } 

    render() {
        const { onChange,onChangePais, onChangeProvincia  , onChangeLocalidad ,onSubmit , direccion , formuRef } = this.props

        return (
            <Form {...posicionForm} ref={formuRef} name="control-ref" onFinish={onSubmit} >
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}>
                    <Input onChange={onChange} name="nombre"  />
                </Form.Item>
                <Form.Item
                    label="Apellido"
                    name="apellido"
                    rules={[{ required: true, message: 'Por favor ingrese su apellido!' }]}>
                    <Input onChange={onChange} name="apellido"  />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Por favor ingrese su email!' },{type: 'email', message: 'Por favor ingrese un email valido'}]}>
                    <Input onChange={onChange} name="email"/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingrese su password!' }]}>
                    <Input.Password onChange={onChange} name="password"  />
                </Form.Item>
                <Form.Item
                    label="Pais"
                    name="pais_id"
                    rules={[{ required: true, message: 'Por favor seleccione un pais' }]}>
                    <Select
                        showSearch
                        placeholder="Seleccione un pais"
                        optionFilterProp="label"
                        options={direccion.paises}
                        onChange={onChangePais}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Provincia"
                    name="provincia_id"
                    rules={[{ required: true, message: 'Por favor seleccione una provincia' }]}>
                    <Select
                        showSearch
                        placeholder="Seleccione una provincia"
                        optionFilterProp="label"
                        onChange={onChangeProvincia}
                        options={direccion.provincias}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Localidad"
                    name="localidad_id"
                    rules={[{ required: true, message: 'Por favor seleccione una localidad' }]}>
                    <Select
                        showSearch
                        placeholder="Seleccione una localidad"
                        optionFilterProp="label"
                        onChange={onChangeLocalidad}
                        options={direccion.localidades}
                        onSearch={this.onSearch}
                        filterOption={(input, option) =>
                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                    </Select>
                </Form.Item>
                <Form.Item {...posicionBotton}>
                    <Button
                        type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>

        );
    }

    
}

export default PersonaForm ;