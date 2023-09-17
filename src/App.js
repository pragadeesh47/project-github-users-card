import React from "react";
import "./App.css"
import { useState } from "react";
// const { Octokit } = require("@octokit/core");
const App = () =>{
  const [inputName, setInputName] = useState('')
  const [username, setUserName] = useState('')
  const [login, setLogin] = useState('')
  const [repos, setRepos] = useState(null)
  const [gists, setGists] = useState(null)
  const [date, setDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [failed, setFailed] = useState(false)
  const [avatar, setAvatar] = useState(null)
 const fetchUserData = () => {
  // Make a GET request using fetch
  if(inputName === ''){
    alert('Enter the username')
    return 
  }
  setIsSubmitted(true)
  setIsLoading(true)
  setFailed(false)
  fetch(`https://api.github.com/users/${inputName}`,{
    method : 'GET'
  })
    .then((response) => {
      if (!response.ok) {
        // throw new Error('Network response was not ok');
        setIsLoading(true)
        setFailed(true)
        console.log(response)

      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      setIsLoading(false)
      setUserName(data.name)
      setLogin(data.login)
      setRepos(data.public_repos)
      setGists(data.public_gists)
      setDate(data.created_at)
      setAvatar(data.avatar_url)
    })
    .catch((error) => {
     console.log(error)
    });
  }
  return(
   <div className="app">
   <h3 style={{textAlign:'center'}}>GITHUB USERS CARD</h3>
    <div>
      <input value={inputName} onChange={
        (e)=>{setInputName(e.target.value)}
      } type="text" name="name" placeholder="username"/>
      <button
      onClick={fetchUserData}
      >SUBMIT</button>
    </div>

      {isSubmitted ? !isLoading ? failed ? <p style={{textAlign:'center',marginTop:'20px'}}>No users found</p>  : <div className="user-card">
      <div className="github-user">
        <img src={avatar} alt="" />
        <div>
          <span className="username">{username || login}</span>
          <br />
          <span  className="login">{login}</span>
        </div>
      </div>
      <p className="repos">{repos} repositories</p>
      <p className="gists">{gists} gists</p>
      <p className="date">created on {date.slice(0,10)}</p>
    </div> : <p style={{textAlign:'center',marginTop:'20px'}}>Loading...</p> 
      : ''}
   </div>

  )
}

export default App;