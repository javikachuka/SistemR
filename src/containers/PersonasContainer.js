import React from 'react'
import Personas from '../pages/Personas'
import { List, message, Spin } from 'antd';
import {getPersonas, deletePersona} from '../services/PersonaService'

class PersonasContainer extends React.Component{

    
    state = {
        datos: [],
        filtro: [],
        loading: true
    }

        
    componentDidMount(){
            // await this.fetchPersonas()
            getPersonas()
            .then(
                (res) => {
                    this.setState({
                        datos: res,
                        filtro: res,
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

    handleChangeButton = (e) => {
        var f = e.target.value
        if(f !== ''){
            const aux = this.state.datos.filter(item => item.nombre.indexOf(f) != -1)
            this.setState({
                datos: aux
            })
        }else {
            const aux = this.state.filtro
            this.setState({
                datos: aux
            })
        }
    }

    render(){
        return (
            <>
                <Personas
                    loading={this.state.loading}
                    datos= {this.state.datos}
                    handleClickDelete={this.handleClickDelete}
                    handleChangeButton={this.handleChangeButton}
                />
            </>
        );
    }

}

export default PersonasContainer