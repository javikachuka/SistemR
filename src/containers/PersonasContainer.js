import React from 'react'
import Personas from '../pages/Personas'
import { List, message, Spin } from 'antd';
import {getPersonas, deletePersona} from '../services/PersonaService'

class PersonasContainer extends React.Component{

    
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
                    const aux = this.state.datos.filter(item => item.id !== res.id)
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

    render(){
        return (
            <>
                <Personas
                    loading={this.state.loading}
                    datos= {this.state.datos}
                    handleClickDelete={this.handleClickDelete}
                />
            </>
        );
    }

}

export default PersonasContainer