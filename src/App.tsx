import './App.css'
import TopNavBar from './components/Top-Nav-Bar'
import ResidentCardSideBar from './components/ResidentCardSideBar'

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

function App() {
  return (
	<div>
		<TopNavBar />
		<div className="flex w-full">
			<ResidentCardSideBar data={data}/>
		</div>
	</div>
  )
}

export default App
