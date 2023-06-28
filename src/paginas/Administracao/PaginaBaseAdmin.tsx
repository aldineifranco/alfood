import { AppBar, Box, Button, Container, Paper, Toolbar, Typography, Link } from "@mui/material"
import { Outlet, Link as RouterLink } from "react-router-dom"

export const PaginaBaseAdmin = () => {
  return (
    <>
      <AppBar>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>

            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
              <Link component={RouterLink} to="restaurantes">
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="restaurantes/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
              <Link component={RouterLink} to="pratos">
                <Button sx={{ my: 2, color: 'white' }}>
                  Pratos
                </Button>
              </Link>
              <Link component={RouterLink} to="pratos/novo">
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Prato
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 12 }}>

          <Paper sx={{ p: 2 }}>

            <Outlet></Outlet> {/** ROTAS FILHAS */}

          </Paper>

        </Container>
      </Box>


    </>
  )
}