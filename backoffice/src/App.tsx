import React from 'react';
import logo from './logo.svg';
import './App.css';

const API_ENDPOINT = 'https://discord.com/api/v8'
const CLIENT_ID = '746410404959223919'
const CLIENT_SECRET = 'MilCpW4cBAOiGN0ImlEIyALXzPcXsJni'
const REDIRECT_URI = 'http://localhost:8080'

const exchangeCode = async () => {

  const body = new URLSearchParams();
  body.append('client_id', CLIENT_ID);
  body.append('client_secret', CLIENT_SECRET);
  body.append('Grant_type', 'authorization_code');
  body.append('code', '');
  body.append('scopes', 'identify');
  body.append('redirect_uri', REDIRECT_URI);
  const rawResponse = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "code=1&client_id=746410404959223919&client_secret=MilCpW4cBAOiGN0ImlEIyALXzPcXsJni&grant_type=authorization_code",
  });
  const content = await rawResponse.json();
  console.log(content);
}

function App() {
  exchangeCode();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => exchangeCode()}>se connecter à discord</button>
      </header>
    </div>
  );
}

export default App;
