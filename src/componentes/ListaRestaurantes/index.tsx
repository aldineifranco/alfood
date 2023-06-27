import axios from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';


const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')

  const carregarDados = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
    .then(resposta => {
      setRestaurantes(resposta.data.results)
      setPaginaAnterior(resposta.data.previous)
      setProximaPagina(resposta.data.next)
    })
    .catch(erro => {
      console.log(erro)
    })
  }

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}

    {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>Pagina Anterior</button>}
    
    {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>Próxima Página</button>}
  </section>)
}

export default ListaRestaurantes