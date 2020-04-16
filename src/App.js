import React,{useState} from 'react';
import './App.css';
import api from './services/api';

function App() {
  const [Nome, setNome] = useState()
  const [Cpf, setCpf] = useState()
  const [Nasc, setNasc] = useState()
  const [Salario, setSalario] = useState()
  const [Dependentes, setDependentes] = useState()
  const [Empregado, setEmpregado] = useState('S')
  const [TempEmprego, setTempEmprego] = useState()
  const [RestSerasa, setRestSerasa] = useState('S')
  const [Limite, getLimite] = useState()

  async function handleSubmit(event){
    event.preventDefault();

    const data = {
      Nome,
       Cpf, 
       Nasc, 
       Salario, 
       Dependentes, 
       Empregado, 
       TempEmprego, 
       RestSerasa,
    }
    try {
      const response = await api.post('banco', data);
      const message =  response.data.message
      const Limite =  response.data.valorLimite;
      console.log(message)
      getLimite(Limite)
    }
    catch(err){
    alert('Show error');
  }

  }
  return (
    <div className="container">
      <div className="content">
      <form onSubmit={handleSubmit} >
        <label>APROVAÇÃO DE CREDITO</label>

        <input placeholder="Nome" id="Nome" onChange={event => setNome(event.target.value)} value={Nome}></input>
        <input 
        placeholder="CPF"
        id="Cpf" 
        onChange={event => 
        setCpf(event.target.value)}
        value={Cpf}></input>

        <label>Data de Nascimento</label>
        <input placeholder="Data de Nascimento" id="Nasc" onChange={event => setNasc(event.target.value)} value={Nasc}></input>

        <label>Salario</label>
        <input placeholder="Salario" id="Salario" onChange={event => setSalario(event.target.value)} value={Salario}></input>

        <label>Dependentes</label>
        <input placeholder="Dependentes" id="Dependentes" onChange={event => setDependentes(event.target.value)} value={Dependentes}></input>

        <label>Tempo No Emprego Atual (Meses)</label>
        <input placeholder="TempEmprego" id="TempEmprego" onChange={event => setTempEmprego(event.target.value)} value={TempEmprego}></input>

        <label>Atualmente está empregado(S/N):</label>
        <select value={Empregado} onChange={event => setEmpregado(event.target.value)}>
          <option value="S">S</option>
          <option value="N">N</option>
        </select>

        <label>Possui restrição no Serasa(S/N):</label>
        <select value={RestSerasa} onChange={event => setRestSerasa(event.target.value)}>
          <option value="S">S</option>
          <option value="N">N</option>
        </select>

        <button className="btn" type="submit">CALCULAR APROVAÇÃO</button>
       
      </form>
      <div className="result">
        {
          Limite > 0 &&
        <p>O VALOR DO LIMITE APROVADO É DE R${Limite}</p>
        }
      </div>
      </div>
    </div>
  );

}

export default App;
