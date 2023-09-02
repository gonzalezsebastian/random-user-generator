import React, { useState, useEffect } from 'react'
import '../components/styles/UserProfile.css'

function UserProfile() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({}); 
  const [title, setTitle] = useState("");
  const [subtext, setSubtext] = useState("");

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUser(result.results[0]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleUsuario = () => {
    setTitle("My name is");
    setSubtext(user.name?.first + " " + user.name?.last);
  }

  const handleEmail = () => {
    setTitle("My email address is");
    setSubtext(user.email);
  }

  const handleCalendario = () => {
    setTitle("My birthday is");
    const date = new Date(user.dob.date)
    setSubtext(date.toLocaleDateString('en-GB'));
  }

  const handleMapa = () => {
    setTitle("My address is");
    setSubtext(user.location?.street?.name + " " + user.location?.street?.number);
  }

  const handleTelefono = () => {
    setTitle("My phone number is");
    setSubtext(user.phone);
  }

  const handleCandado = () => {
    setTitle("My password is");
    setSubtext(user.login?.password);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <div>
      <header className="App-header">
        <img src={user.picture.large} className="Profile-pic" alt="profile"/>
      </header>
      <div className="App-body">
        <p className="title">{title}</p>
        <h1 className="subtext">{subtext}</h1>
      </div>
      <div className="App-buttons">
        <button className="App-button" onClick={handleUsuario}><img src='/usuario.png' alt='Usuario'/></button>
        <button className="App-button" onClick={handleEmail}><img src='/sobre.png' alt='Email'/></button>
        <button className="App-button" onClick={handleCalendario}><img src='/calendario.png' alt='Calendario'/></button>
        <button className="App-button" onClick={handleMapa}><img src='/marcador.png' alt='Mapa'/></button>
        <button className="App-button" onClick={handleTelefono}><img src='/llamada-telefonica.png' alt='Usuario'/></button>
        <button className="App-button" onClick={handleCandado}><img src='/cerrar.png' alt='Candado'/></button>
      </div>
    </div>
  )
    }
}

export default UserProfile