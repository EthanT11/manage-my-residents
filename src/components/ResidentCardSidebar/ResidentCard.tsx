import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import pic from '../../assets/test-stock-img.jpg'; // stock image
import { useEffect, useState } from "react";

interface ResidentCardProps {
  id?: string;
  name: [string, string];
  info: [string, string];
  isSelected: boolean;
  setisSelected: (id: string) => void;
  deleteCard: () => void;
}

export default function ResidentCard({ id, name, info, isSelected, setisSelected, deleteCard }: ResidentCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(isSelected);

  useEffect(() => {
    setIsCollapsed(!isSelected);
  }, [isSelected]);

  const handleClick = () => { // function to toggle the card expansion
    if (id) {
      setisSelected(id);
    } else {
      console.log("Error(ResidentCard): id is undefined");
    }
  }

  return (
    <Card className={`grow-0 shadow-lg rounded-lg m-2 transition-transform transform hover:scale-105
      ${isCollapsed ? 'bg-white' : 'bg-sky-200'}
    `}>
      <CardHeader className="text-center items-center cursor-pointer bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-t-lg" onClick={handleClick}>
        <CardTitle className={`hover:bg-blue-600 hover:text-white cursor-pointer p-2 rounded-lg border-2 transition-colors
          ${isCollapsed ? 'text-white' : 'bg-blue-600 text-white'}
        `}>
          {name[0] + " " + name[1]} {isCollapsed ? '▼' : '▲'}
        </CardTitle>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="flex flex-col items-center justify-center p-4">
          <img src={pic} width={150} height={100} alt="profilepic" className="rounded-full shadow-md mb-4 transition-transform transform hover:scale-110" />
        </CardContent>
      )}
      <CardFooter className="flex flex-col items-center p-4 bg-gray-100 border-t border-gray-300">
        <p className="text-gray-800 font-semibold">Wing - {info[0]} | Room - {info[1]}</p>
        {isSelected && (
          <button onClick={deleteCard} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md">
            Delete
          </button>
        )}
      </CardFooter>
    </Card>
  );
}