import './App.css'
import ResidentCard from './components/ResidentCard'

const data = { 
	residents: [
		{
			name: "bill",
			age: "65",
			wing: "Left",
			room: "100"
		},
		{
			name: "jill",
			age: "50",
			wing: "Left",
			room: "101"
		},
		{
			name: "billy",
			age: "93",
			wing: "Right",
			room: "102"
		},
	]
}

const listDummyCards = data.residents.map(resident => 
	<ResidentCard name={resident.name} age={resident.age} info={[resident.wing, resident.room]}/>
)

function App() {

  return (
    <>
			{listDummyCards}
    </>
  )
}

export default App
