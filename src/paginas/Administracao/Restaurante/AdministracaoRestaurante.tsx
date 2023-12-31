import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

export const AdministracaoRestaurante = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  const excluir = (restauranteParaExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteParaExcluir.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteParaExcluir.id)
        setRestaurantes([...listaRestaurante])
        alert("Restaurante Exluído!")
      })
  }

  return (
    <TableContainer>
      <Button variant="contained" color="info" fullWidth sx={{ mb: 2 }}><Link to={'/admin/restaurantes/novo'} style={{ textDecoration: 'none', color: 'white' }}>Adcionar Restaurante</Link></Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" color="primary" align="center">
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => (
            <>
              <TableRow>
                <TableCell align="center" size="small">
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
                </TableCell>
              </TableRow>
            </>
          ))}
          <TableRow sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>

          </TableRow>
        </TableBody>
      </Table>

    </TableContainer>
  )
}