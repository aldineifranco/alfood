import { useEffect, useState } from "react"
import IPrato from "../../../interfaces/IPrato"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

export const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(resposta => setPratos(resposta.data))
  }, [])

  const excluir = (pratosParaExcluir: IPrato) => {
    http.delete(`pratos/${pratosParaExcluir.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratosParaExcluir.id)
        setPratos([...listaPratos])
        alert("Prato Exluído!")
      })
  }

  return (
    <TableContainer>
      <Button variant="outlined" color="info" fullWidth sx={{ mb: 2 }}><Link to={'/admin/pratos/novo'}>Adcionar Prato</Link></Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell variant="head" color="primary">
              Nome
            </TableCell>
            <TableCell>
              Descrição
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
          {pratos.map(prato => (
            <>
              <TableRow key={prato.id}>
                <TableCell align="left" size="small">
                  {prato.nome}
                </TableCell>
                <TableCell align="left" size="small" sx={{ maxWidth: 40}}>
                  {prato.descricao}
                </TableCell>
                <TableCell align="left" size="small">
                  {prato.tag}
                </TableCell>
                <TableCell>
                  [ <a href={prato.imagem} target="_black" rel="noreferer">Ver Imagem</a>]
                </TableCell>
                <TableCell>
                  [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link>]
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
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