import { Button, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
      <Container>
        <Row>
          <Typography variant="h2" gutterBottom className="text-center">
            Estrattore Alunni
          </Typography>
          <Row>
            <Col xl={9}>
              <FormControl fullWidth>
              <Select
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={'TPSIT - 3H'}>TPSIT - 3H</MenuItem>
                <MenuItem value={'TPSIT - 4H'}>TPSIT - 4H</MenuItem>
                <MenuItem value={'SISTEMI E RETI - 3F'}>SISTEMI E RETI - 3F</MenuItem>
                <MenuItem value={'SISTEMI E RETI - 4F'}>SISTEMI E RETI - 4F</MenuItem>
                <MenuItem value={'SISTEMI E REIT - 5F'}>SISTEMI E REIT - 5F</MenuItem>
              </Select>
              </FormControl>
            </Col>
            <Col xl={3}></Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default App;
