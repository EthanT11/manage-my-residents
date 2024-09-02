import './App.css'
import ResidentCard from './components/ResidentCard'
import CardHeader from './components/CardHeader'
import TopNavBar from './components/Top-Nav-Bar'

// Maybe a blue and lightgray theme?
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
	<div>
		<TopNavBar />
		<div className="flex w-full">
			<div className="flex flex-col p-4">
				<CardHeader />
				<div className="grid grid-cols-2">
					{listDummyCards}
				</div>
			</div>
		</div>
	</div>
  )
}

export default App
