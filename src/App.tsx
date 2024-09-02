import './App.css'
import ResidentCard from './components/ResidentCard'
import CardHeader from './components/CardHeader'
import TopNavBar from './components/Top-Nav-Bar'

// Maybe a blue and lightgray theme?
const data = { 
	residents: [
		{
			name: "Bill Billington",
			age: "65",
			wing: "Left",
			room: "100"
		},
		{
			name: "Jill Jillington",
			age: "50",
			wing: "Right",
			room: "101"
		},
		{
			name: "Billy Billington",
			age: "93",
			wing: "Left",
			room: "102"
		},
		{
			name: "Jilly Jillington",
			age: "45",
			wing: "Right",
			room: "103"
		},
		{
			name: "Steve Stevenson",
			age: "87",
			wing: "Left",
			room: "104"
		}
	]
}

const listDummyCards = data.residents.map(resident => 
	<ResidentCard name={resident.name} info={[resident.wing, resident.room]}/>
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
