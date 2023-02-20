import { Button, List, ListItem,  ListItemIcon, Checkbox, ListItemButton, ListItemText, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import data from './alunni.json';

function App() {
  const [classi, setClassi] = useState([]);
  const [classeScelta, setClasseScelta] = useState('');
  const [alunni, setAlunni] = useState([]);
  const [numeroAlunni, setNumeroAlunni] = useState(null);
  const [numeroAlunniEstraibili, setNumeroAlunniEstraibili] = useState(null);

  const handleChange = (event) => {
    setClasseScelta(event.target.value);
  };

  const refreshData = (newAlunni) => {
    let newClassi = [];
    for (let classe of classi) {
      if (classe.classe === classeScelta) {
        newClassi.push({classe: classe.classe, materia: classe.materia, alunni: newAlunni});
      } else {
        newClassi.push(classe);
      }
    }

    setClassi(newClassi);
    localStorage.setItem('data', JSON.stringify(newClassi));
  };

  const handleToggle = (cognome, nome) => () => {
    let newAlunni = []
    for (let alunno of alunni) {
      if (alunno.cognome === cognome && alunno.nome === nome) {
        newAlunni.push({cognome: alunno.cognome, nome: alunno.nome, voto: !alunno.voto});
      } else {
        newAlunni.push(alunno);
      }
    }

    setAlunni(newAlunni);
    setNumeroAlunniEstraibili(newAlunni.filter((e) => (e.voto)).length);
    refreshData(newAlunni);
  };

  const selezionaTutti = () => {
    let newAlunni = []
    for (let alunno of alunni) {
      newAlunni.push({cognome: alunno.cognome, nome: alunno.nome, voto: false});
    }

    setAlunni(newAlunni);
    setNumeroAlunniEstraibili(newAlunni.filter((e) => (e.voto)).length);
    refreshData(newAlunni);

  };

  useEffect(() => {
    let saved = localStorage.getItem("data");
    if (saved) {
      setClassi(JSON.parse(saved));
    } else {
      localStorage.setItem('data', JSON.stringify(data));
      setClassi(data);
    }
    setClasseScelta('3H');
  }, []);

  useEffect(() => {
    if (classeScelta) {
      let alunni = classi.find((e) => (e.classe === classeScelta)).alunni;
      setAlunni(alunni);
      setNumeroAlunni(alunni.length);
      setNumeroAlunniEstraibili(alunni.filter((e) => (e.voto)).length);
    }
  }, [classeScelta]);

  return (
    <>
      <Container>
        <Row>
          <Typography variant="h2" gutterBottom className="text-center">
            Estrattore Alunni
          </Typography>

        </Row>
        <Row>
          <Col xl={9}>
            <FormControl fullWidth>
              <Select
                value={classeScelta}
                onChange={handleChange}
              >
                {
                  classi.map((element) => <MenuItem key={element.classe} value={element.classe}>{element.materia + " - " + element.classe}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Col>
          <Col xl={3}>
            <Typography variant="h4" gutterBottom className="text-center">
            Estraibili: {numeroAlunniEstraibili}/{numeroAlunni}
            </Typography>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col  xl={5}>
          <List sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'lightgray',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 500,
        '& ul': { padding: 0 },
      }}>
      {alunni.map((e) => {
        const labelId = `${e.cognome} ${e.cognome}`;

        return (
          <ListItem
            key={e.cognome + e.nome}
            secondaryAction={null}
            disablePadding
          >
            <ListItemButton onClick={handleToggle(e.cognome, e.nome)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={!e.voto}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${e.cognome} ${e.nome}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
          </Col>
          <Col xl={2} className="align-self-center">
            <Row className="text-center">
            <Col>
            <Button variant="contained" onClick={selezionaTutti}>SELEZIONA TUTTI</Button></Col>

            </Row>
            <br></br>
            <Row className="text-center">
            <Col>
            <Button variant="contained">ESTRAI</Button>
            </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
