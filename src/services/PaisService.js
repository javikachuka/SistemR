import url from './config'
import axios from 'axios'

export async function getPaises(){
    const res = await axios.get(url+'paises')
    return res.data
}
