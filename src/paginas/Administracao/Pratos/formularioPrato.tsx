import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { ITag } from "../../../interfaces/ITag"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"


export const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState('')
  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })

      .then(() => {
        setNomePrato('')
        setDescricao('')
        setTag('')
        setRestaurante('')
  
        alert('Prato cadastrado com sucesso!')
      }) 
      .catch(erro => console.log(erro))
  }


  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 14 }}>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
            <Box component='form' onSubmit={aoSubmeterForm} sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #f5f5f5', padding: 3, borderRadius: 2, width: '100%' }}>
              <TextField
                value={nomePrato}
                onChange={evento => setNomePrato(evento.target.value)}
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
                margin="dense"
              >
              </TextField>
              <TextField
                value={descricao}
                onChange={evento => setDescricao(evento.target.value)}
                label="Descrição"
                variant="standard"
                fullWidth
                required
                margin="dense"
              >
              </TextField>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-tag">Tag</InputLabel>
                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                  {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                    {tag.value}
                  </MenuItem>)}
                </Select>
              </FormControl>

              <FormControl margin="dense" fullWidth>
                <InputLabel id="select-restaurante">Restaurante</InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                  {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                    {restaurante.nome}
                  </MenuItem>)}
                </Select>
              </FormControl>

              <input type="file" onChange={selecionarArquivo} />

              <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }} >Salvar</Button>

            </Box>
          </Box>

        </Container>
      </Box>

    </>
  )
}