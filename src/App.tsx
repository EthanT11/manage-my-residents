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
	<div className="flex flex-col">
		<TopNavBar />
		<div className="flex flex-1 shadow-lg">
			<div className='flex-1 w-1/3 bg-white'>
				<ResidentCardSideBar data={data}/>
			</div>
			<div className='flex flex-col bg-yellow-500'>
				<div className='bg-slate-500'>
					<p>Some other content</p>
				</div>
				<div className='bg-slate-400'>
					<p>Some other content</p>
				</div>
			</div>
		</div>
	</div>
  )
}

export default App
