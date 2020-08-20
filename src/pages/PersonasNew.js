import React from 'react';
import NavBar from '../components/NavBar';
import PersonaForm from '../components/PersonaForm'
import { Button, Row, Col, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import url from '../services/config'

class PersonasNew extends React.Component{

    

    state = {
        personaForm : {
            nombre: 'ddddd',
            apellido: '',
            email: '',
            password: '',
            pais_id: '',
            provincia_id: '',
            localidad_id: ''
        } ,
        direccion: {
            paises: [],
            provincias: [],
            localidades: [],
        },
        editing: false,
        redirect: null
    } 

    formRef = React.createRef() ;

    handleChange = e => {
        this.setState({
            personaForm: {
                ...this.state.personaForm, //mantiene el valor final y agrega los nuevos
                [e.target.name]: e.target.value
            }
        })
    }
    
    componentDidMount(){

        if(this.props.match.params.id != null){
            this.setState({
                editing: true
            })

            axios.get(url+'personas/'+this.props.match.params.id)
                .then(
                    (res) => {
                        let valor = res.data
                        this.setState({
                            personaForm: {
                                nombre: valor.nombre,
                                apellido: valor.apellido,
                                email: valor.email,
                                password: valor.password,
                                pais_id: valor.direcciones[0].pais_id,
                                provincia_id: valor.direcciones[0].provincia_id,
                                localidad_id: valor.direcciones[0].localidad_id
                            }
                        })
                        this.handleChangePais(valor.direcciones[0].pais_id)
                        this.handleChangeProvincia(valor.direcciones[0].provincia_id)
                        this.formRef.current.setFieldsValue({
                            nombre: valor.nombre,
                            apellido: valor.apellido,
                            email: valor.email,
                            password: valor.password,
                            pais_id: valor.direcciones[0].pais_id,
                            provincia_id: valor.direcciones[0].provincia_id,
                            localidad_id: valor.direcciones[0].localidad_id
                        })
                    }
                    
                ).catch(
                    (error) => {
                        console.log(error)
                    }
                )

            
        }

        axios.get(url+'paises'
        ).then(
            (datos) => {
                let aux = []; 
                datos.data.map(
                    (d) => {
                        let p = {
                            value : d.id,
                            label : d.pais 
                        }
                        aux.push(p) ;
                    }
                )
                this.setState({
                    direccion:{
                        paises: aux
                    }
                })
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    handleSubmit = e => {
         //sirve para no recargar la pagina al clickear en un boton submit
        console.log(this.state.personaForm) ;
        axios.post(url+'personas',
            this.state.personaForm
        ).then(
            (res) => {
                console.log(res) ;
                this.setState({redirect: true}) ;
                message.success('La persona se ha guardado con exito!')
            }
        ).catch(
            (error) => {
                console.log(error) ;
            }
        )
    }
    handleChangePais = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            personaForm:{
                ...this.state.personaForm,
                pais_id : value
            }
        })
        axios.get(url+'provincias/'+value
        ).then(
            (datos) => {
                console.log(datos.data) ; 
                let aux = []; 
                datos.data.map(
                    (d) => {
                        let p = {
                            value : d.id,
                            label : d.provincia 
                        }
                        aux.push(p) ;
                    }
                )
                this.setState({
                    direccion:{
                        ...this.state.direccion,
                        provincias: aux
                    }
                })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    
    }
    
    handleChangeProvincia = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            personaForm:{
                ...this.state.personaForm,
                provincia_id : value
            }
        })
        axios.get(url+'localidades/'+value
        ).then(
            (datos) => {
                console.log(datos.data) ; 
                let aux = []; 
                datos.data.map(
                    (d) => {
                        let p = {
                            value : d.id,
                            label : d.localidad 
                        }
                        aux.push(p) ;
                    }
                )
                this.setState({
                    direccion: {
                        ...this.state.direccion,
                        localidades: aux
                    }
                })
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    handleChangeLocalidad = (value) => {
        this.setState({
            personaForm:{
                ...this.state.personaForm,
                localidad_id : value
            }
        })
    }

    render(){
        if(this.state.redirect == null){
            return(
                <>
                <NavBar/>
                <Row className="justify-content-center mt-4">
                    <Col span={2}></Col>
                    <Col span={8}>
                        <PersonaForm
                            onChange={this.handleChange}
                            onChangePais={this.handleChangePais}
                            onChangeProvincia={this.handleChangeProvincia}
                            onChangeLocalidad={this.handleChangeLocalidad}
                            form={this.state.personaForm}
                            direccion={this.state.direccion}
                            onSubmit={this.handleSubmit}
                            formuRef={this.formRef}
                        />
                    </Col>
    
                </Row>
                </>
            )
        }else{
            return (
                <Redirect to="/personas"></Redirect>
            ) 
        }
    }
}

export default PersonasNew;