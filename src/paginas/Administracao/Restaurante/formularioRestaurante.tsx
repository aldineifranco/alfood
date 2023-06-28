import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import IRestaurante from "../../../interfaces/IRestaurante"
import http from "../../../http"



export const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('')


  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Atualizado com sucesso!")
   
        })
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert("Restaurante Cadastrado!")
        })

    }

    console.log('preciso enviar dados para a API: ')
    console.log(nomeRestaurante)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
      <Box component='form' onSubmit={aoSubmeterForm} sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #f5f5f5', padding: 3, borderRadius: 2 }}>
        <TextField
          value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        >
        </TextField>

        <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }}>Salvar</Button>
        
      </Box>
    </Box>
  )
}