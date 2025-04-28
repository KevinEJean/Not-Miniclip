import './App.css';
import Container from './Container';

function App() {

  return (
    <div className='menu-root'>
      <h1>Welcome to NOT Miniclip !</h1>
      <p>This is a web site wich links to 4 different games made by yours trully... <a href='https://github.com/KevinEJean'>ME</a>. This was made for a school project. More info can be found in <a href='https://github.com/KevinEJean/Not-Miniclip'>here</a>. ( trust the link... or not... I wouldn't )</p>
      <div className='container-grid'>
        <Container />
        <Container />
        <Container />
        <Container />
      </div>
    </div>
  )
}

export default App
