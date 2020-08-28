import React from 'react'
import { List, message, Spin } from 'antd';
import { Button } from 'antd';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import axios from 'axios'
import PersonaList from '../components/PersonaList';
import url from '../services/config'
import {getPersonas, deletePersona} from '../services/PersonaService'

class Personas extends React.Component{

    
    state = {
        datos: [],
        loading: true
    }

        
    componentDidMount(){
            // await this.fetchPersonas()
            getPersonas()
            .then(
                (res) => {
                    this.setState({
                        datos: res,
                        loading: false
                    })
                }
            ).catch(
                (error) => {
                    console.log(error);
                    message.warning('Hubo un error en el servidor, intente mas tarde')
                    this.setState({
                        loading:false
                    })
                }
            )
    }

    handleClickDelete = (value) => {
        console.log(value)

        deletePersona(value)
            .then(
                (res) => {
                    const aux = this.state.datos.filter(item => item.id !== res.data.id)
                    this.setState({
                        datos: aux
                    });
                    message.success('Persona eliminada con exito!')
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    // fetchPersonas = async () => {
    //     let res = await fetch('http://afip.com/personas')
    //     let data = res.json()
    //     this.setState({
    //         data
    //     })
    //     console.log(data.PromiseValue)
    // }


    render(){
        return (
            <>
                <NavBar/>
                <Spin spinning={this.state.loading} delay={500}>
                    <PersonaList personas={this.state.datos} onClickDelete={this.handleClickDelete} />
                </Spin>
            </>
        );
    }

}

export default Personas