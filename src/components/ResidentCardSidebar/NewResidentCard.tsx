import { useEffect, useState } from "react"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface NewResidentCardProps {
	id?: string;
	name: [string, string];
	info: [string, string];
	isSelected: boolean;
	setisSelected: (id: string) => void;
	deleteCard: () => void;
}

export default function NewResidentCard( { id, name, info, isSelected, setisSelected, deleteCard }: NewResidentCardProps ) {
	const [isCollapsed, setIsCollapsed] = useState(isSelected);

	useEffect(() => {
		setIsCollapsed(!isSelected);
	}, [isSelected]);

	const handleCardSelection = () => {
		if (id) {
			setisSelected(id);
		} else {
			console.log("Error(ResidentCard): id is undefined");
		}
	}

	return (
    <Card className="w-full max-w-sm border-0 shadow-lg">
      <CardHeader className="bg-[#0077be] text-white p-4 flex flex-row items-center justify-between rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8 bg-white text-[#0077be]">
            <AvatarFallback>{name[0].charAt(0)}{name[1].charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{name[0]} {name[1]}</h2>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#0066a4]" onClick={handleCardSelection}>
			{isCollapsed ?  
			 <ChevronDown className="h-4 w-4"/>
			: 
			 <ChevronUp className="h-4 w-4"/>
			}
        </Button>
      </CardHeader>
	  {!isCollapsed && (
		<>
		<CardContent className="p-4 bg-[#e6f3f8]">
		  <div className="flex justify-between items-center">
			<div>
			  <p className="text-sm text-[#005580] font-medium">Wing</p>
			  <p className="font-semibold text-[#003366]">{info[0]}</p>
			</div>
			<div>
			  <p className="text-sm text-[#005580] font-medium">Room</p>
			  <p className="font-semibold text-[#003366]">{info[1]}</p>
			</div>
		  </div>
		</CardContent>
		<CardFooter className="bg-[#e6f3f8] p-4 rounded-b-lg">
			<Button 
			variant="destructive" 
			size="sm" 
			className="w-full bg-[#ff6b6b] hover:bg-[#ff4757] text-white"
			onClick={deleteCard}
			>
			<Trash2 className="h-4 w-4 mr-2" />
			Delete Record
			</Button>
		</CardFooter>
		</>
	  )}

    </Card>
  )
}