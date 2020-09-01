import React from 'react';
import PersonaNew from '../pages/PersonaNew'
import { Button, Row, Col, message } from 'antd';
import { Redirect } from "react-router-dom";
import {savePersona, editPersona ,getPersonaById}  from '../services/PersonaService'
import {getPaises}  from '../services/PaisService'
import {getProvinciasByPais}  from '../services/ProvinciaService'
import {getLocalidadesByProvincia}  from '../services/LocalidadService'


class PersonaContainer extends React.Component {
      

    state = {
        personaForm : {
            nombre: '',
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

            getPersonaById(this.props.match.params.id)
                .then(
                    (res) => {
                        let valor = res
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

        getPaises()
        .then(
            (datos) => {
                let aux = []; 
                datos.map(
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
        if(this.state.editing == false ){
            savePersona(
                this.state.personaForm
            )
                .then(
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
        } else {
            var params = this.state.personaForm
            params = {
                ...params,
                id: this.props.match.params.id 
            }
            editPersona( params )
              .then(
                  (res) => {
                      this.setState({
                          redirect: true
                      })
                      message.success('La persona se ha actualizado con exito!')
                  }
              )
              .catch(
                  (error) => {
                      console.log(error);
                  }
              )
        }
    }
    handleChangePais = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            personaForm:{
                ...this.state.personaForm,
                pais_id : value
            }
        })
        getProvinciasByPais(value)
        .then(
            (datos) => {
                console.log(datos) ; 
                let aux = []; 
                datos.map(
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
        getLocalidadesByProvincia(value)
        .then(
            (datos) => {
                console.log(datos) ; 
                let aux = []; 
                datos.map(
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
    
    render() { 
        if(this.state.redirect == null){

            return ( 
                <>
                    <PersonaNew
                        handleChange={this.handleChange}
                        handleChangePais={this.handleChangePais}
                        handleChangeProvincia={this.handleChangeProvincia}
                        handleChangeLocalidad={this.handleChangeLocalidad}
                        personaForm={this.state.personaForm}
                        direccion={this.state.direccion}
                        handleSubmit={this.handleSubmit}
                        formRef={this.formRef}
                    />
                </>
            );
        }else{
            return (
                <Redirect to="/personas"></Redirect>
            ) 
        }
    }
}
 
export default PersonaContainer;