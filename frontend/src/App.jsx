
import './App.css'
import Mynotes from './pages/Mynotes.jsx'

function App() {
  // const[message,setMessage]=useState('')
  // const [message1,setMessage1]=useState('')

  // useEffect(()=>{
  //   fetch('http://localhost:3000/')
  //  .then(response=>response.text())
  //  .then(data=>setMessage(data))
  //   .catch(error=>console.error('Error fetching message:',error));

  // })
  // const clickme=()=>{
  //   fetch('http://localhost:3000/')
  //   .then(response=>response.text())
  //   .then(data=>setMessage1(data))
  //   .catch(error=>console.error('Error fetching message:',error));
  // }


  return (
    <>
      <div>
      <Mynotes />
        </div>

    </>
  )
}

export default App
