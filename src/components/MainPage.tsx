import TopNavBar from './Top-Nav-Bar';
import ResidentCardSideBar from './ResidentCardSideBar';
import useResidents from '../hooks/useResidents';

export default function MainPage() {
  const { residents } = useResidents();

  return (
    <div className="flex flex-col font-roboto"> {/* Container for the entire page */}
      <TopNavBar />
      <div className="flex flex-1 shadow-lg"> {/* Container for entire dashboard under main nav bar */}
        <div className='flex-1 w-1/3 bg-white'> {/* Container for ResidentSideBar */}
          <ResidentCardSideBar data={{residents}} />
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
  );
};