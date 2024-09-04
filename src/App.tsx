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
		},
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

	]
}

function App() {
  return (
	<div className="flex flex-col font-roboto"> {/* Container for the entire page */}
		<TopNavBar />
		<div className="flex flex-1 shadow-lg"> {/* Container for entire dashboard under main nav bar */}
			<div className='flex-1 w-1/3 bg-white'> {/* Container for ResidentSideBar */}
				<ResidentCardSideBar data={data}/>
			</div>
			<div className='w-2/3 flex flex-col p-4'> {/* Container for right side of dashboard */}
				<div className='bg-slate-500 flex-1'>
					<p>Some other content</p>
				</div>
				<div className='bg-slate-400 flex-1'>
					<p>Some other content</p>
				</div>
			</div>
		</div>
	</div>
  )
}

export default App
