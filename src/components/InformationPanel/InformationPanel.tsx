import { Resident } from "@/hooks/useResidents"
import pic from '../../assets/test-stock-img.jpg'; // stock image
import { FaUser } from 'react-icons/fa'; // Importing an icon from react-icons

interface InformationPanelProps {
  resident: Resident | null
}

export default function InformationPanel({ resident }: InformationPanelProps) {
  return (
    <div className="bg-blue-50 shadow-md rounded-lg flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 rounded-t-lg flex items-center">
        <FaUser className="text-2xl mr-2" />
        <h2 className="text-xl font-semibold">Resident Information</h2>
      </div>
      <div className="flex items-center p-4">
        {resident ? (
          <>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-blue-700 mb-4">{resident.name}</h2>
              <p className="text-lg text-gray-700 mb-2"><strong>Age:</strong> {resident.age}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Wing:</strong> {resident.wing}</p>
              <p className="text-lg text-gray-700 mb-2"><strong>Room:</strong> {resident.room}</p>
            </div>
            <div className="ml-4">
              <img src={pic} alt="Resident" className="rounded-full shadow-md w-32 h-32 object-cover" />
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-500 flex-1">Select a resident to view their information</p>
        )}
      </div>
    </div>
  )
}