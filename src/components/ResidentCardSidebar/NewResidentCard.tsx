import { useEffect, useState, useRef } from "react"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface NewResidentCardProps {
	id?: string;
	name: [string, string];
	info: [string, string];
	isSelected: boolean;
	setIsSelected: (id: string) => void;
	deleteCard: () => void;
}

export default function NewResidentCard( { id, name, info, isSelected, setIsSelected, deleteCard }: NewResidentCardProps ) {
	const [isCollapsed, setIsCollapsed] = useState(!isSelected);
	const [contentHeight, setContentHeight] = useState('0px');
  	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) { 
			setContentHeight(!isCollapsed ? `${contentRef.current.scrollHeight}px` : `0px`);
		}
	}, [isCollapsed]);
	
	const handleCardSelection = () => {
		if (id) {
			setIsCollapsed(!isCollapsed);
			setIsSelected(id);
		} else {
			console.log("Error(ResidentCard): id is undefined");
		}
	}

	return (
    <Card className="grow-0 shadow-lg m-2 border-0 transition-transform transform hover:scale-105">
      <CardHeader className="bg-residentCard-primary text-white p-4 flex flex-row items-center justify-between rounded-t-lg">
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
	  <div
        ref={contentRef}
        style={{ height: contentHeight }}
        className="overflow-hidden transition-height duration-300 ease-in-out"
      >
        <CardContent className="p-4 bg-residentCard-secondary">
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
        <CardFooter className="bg-residentCard-secondary p-4 rounded-b-lg">
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
      </div>

    </Card>
  )
}
