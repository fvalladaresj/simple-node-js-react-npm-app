import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  createTheme,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  IconButton,
  InputAdornment,
  TableFooter,
  TablePagination,
  TextField,
  ThemeProvider,
  useTheme,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  TableCell,
  tableCellClasses,
  TableBody,
  Table,
  Typography,
} from "@mui/material";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  Add,
  Delete,
  Edit,
} from "@mui/icons-material";
import { validator } from "./Validator";
import useForm from "./useForm";

export interface IContact {
  name: string;
  lastname1: string;
  lastname2: string;
  email: string;
  phone: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Item = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
  textAlign: "left",
}));

const App = () => {
  const theme = createTheme();

  const [contactList, setContactList] = useState<IContact[]>([
    {
      name: "Juan",
      lastname1: "Perez",
      lastname2: "Lopez",
      email: "juan@gmail.com",
      phone: "12345678",
    },
  ]);

  interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number
    ) => void;
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, onPageChange } = props;

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, page + 1);
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Box>
    );
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - contactList.length);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  //form
  const [open, setOpen] = useState(false);

  const handleClickOpen = (
    contact: IContact,
    index: number,
    isEdit: boolean
  ) => {
    setInitState(contact);
    setIndex(index);
    setEditMode(isEdit);
    setOpen(true);
  };

  const defaultState = {
    name: "",
    lastname1: "",
    lastname2: "",
    email: "",
    phone: "",
  };

  const [initState, setInitState] = useState<IContact>(defaultState);

  const [index, setIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);

  const Form = () => {
    const handleClose = () => {
      setOpen(false);
    };

    const submit = () => {
      if (editMode) {
        let newArr = [...contactList];
        newArr[index] = state;
        setContactList(newArr);
        setOpen(false);
      } else {
        setContactList((contactList) => [...contactList, state]);
        setOpen(false);
      }
    };

    const { handleChange, handleSubmit, handleBlur, state, errors } = useForm({
      initState,
      callback: submit,
      validator,
    });
    
    return (
      <Dialog  open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle className="title">
            {editMode ? "Editar contacto" : "Añadir contacto"}
          </DialogTitle>
          <DialogContent>
            <TextField
              className={"nameInput"}
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={state.name}
              onChange={handleChange}
              error={errors.name ? true : false}
              helperText={errors.name}
              onBlur={handleBlur}
              required
            />

            <TextField
              className={"lastname1Input"}
              margin="dense"
              name="lastname1"
              label="Primer apellido"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={state.lastname1}
              onChange={handleChange}
              error={errors.lastname1 ? true : false}
              helperText={errors.lastname1}
              onBlur={handleBlur}
              required
            />
            <TextField
              className={"lastname2Input"}
              margin="dense"
              name="lastname2"
              label="Segundo apellido"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={state.lastname2}
              onChange={handleChange}
              error={errors.lastname2 ? true : false}
              helperText={errors.lastname2}
              onBlur={handleBlur}
              required
            />
            <TextField
              className={"emailInput"}
              margin="dense"
              name="email"
              label="Correo"
              type="email"
              fullWidth
              variant="standard"
              defaultValue={state.email}
              onChange={handleChange}
              error={errors.email ? true : false}
              helperText={errors.email}
              onBlur={handleBlur}
              required
            />
            <TextField
              className={"phoneInput"}
              margin="dense"
              name="phone"
              label="Teléfono"
              type="text"
              fullWidth
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+569</InputAdornment>
                ),
              }}
              defaultValue={state.phone}
              onChange={handleChange}
              error={errors.phone ? true : false}
              helperText={errors.phone}
              onBlur={handleBlur}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">{editMode ? "Editar" : "Añadir"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  const handleDelete = (index: number) => {
    let newArr = [...contactList];
    newArr.splice(index, 1);
    setContactList(newArr);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Form />
      <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 8 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Item>
              <Title>
                <Typography variant="h4">Lista de Contactos</Typography>
              </Title>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Button
                id="addContactBtn"
                variant="outlined"
                startIcon={<Add />}
                onClick={() => handleClickOpen(defaultState, 0, false)}
              >
                Agregar
              </Button>
            </Item>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nombre</StyledTableCell>
                <StyledTableCell align="center">
                  Primer apellido
                </StyledTableCell>
                <StyledTableCell align="center">
                  Segundo apellido
                </StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Teléfono</StyledTableCell>
                <StyledTableCell align="center">Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? contactList.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : contactList
              ).map((row, id) => (
                <StyledTableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell id={"rowName"} style={{ width: 160 }} component="th" scope="row" align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell id={"rowLastname1"} align="center" style={{ width: 260 }}>
                    {row.lastname1}
                  </StyledTableCell>
                  <StyledTableCell id={"rowLastname2"} align="center" style={{ width: 260 }}>
                    {row.lastname2}
                  </StyledTableCell>
                  <StyledTableCell id={"rowEmail"} align="center">{row.email}</StyledTableCell>
                  <StyledTableCell id={"rowPhone"} align="center">
                    +569 {row.phone}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      id="editContactBtn"
                      aria-label="edit"
                      onClick={() => handleClickOpen(row, id, true)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      id="deleteContactBtn"
                      aria-label="delete"
                      onClick={() => handleDelete(id)}
                    >
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5]}
                  colSpan={5}
                  count={contactList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default App;
