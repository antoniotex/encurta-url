import React, { Component } from 'react';
import './App.css';
import { Button } from 'reactstrap'
import Header from './components/header/header';
import axios from 'axios'
import { Alert } from 'reactstrap'


class App extends Component{
  constructor(){
    super()
    this.state = {
      novoPost: {},
      novosDados: {}
    }
  }

  handleSearch = (e) => {
    const value = e.target.value
    this.setState({
      novoPost: {
        urlOriginal: value,
        apelidoCustom: ''
      }
    })
  }

  criaNovaUrl = () => {
    axios.post('/api/encurtador', this.state.novoPost).then(res => {
      this.setState({
        novosDados: {
          urlOriginal: res.data.urlOriginal,
          urlEncurtada: res.data.urlEncurtada
        }
      }, console.log(this.state))
    })
  }


  render(){
    const dados = this.state.novosDados
    return (
      <div className="App">
        <Header/>
        <section className="form">
          <h1>Encurtador de URL</h1>
          <input type="text" name="urlOriginal" onInput={this.handleSearch} placeholder="Digite ou cole sua URL aqui..."/>
          <Button onClick={this.criaNovaUrl} color="success">Encurtar!</Button>
          {dados.urlEncurtada && <Alert color="success">
            { `Parabéns, aqui está sua URL encurtada: ${dados.urlEncurtada}` }
          </Alert>}
        </section>
      </div>
    );
  }
}

export default App;
