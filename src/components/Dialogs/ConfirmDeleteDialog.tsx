import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { CustomButton } from "@/components/Common";
import { useResidents } from "@/contexts/ResidentContext";
import { LoadingSpinner } from "@/components/Common";
import { useState } from "react";

export default function ConfirmDeleteDialog() {
	const { selectedResident, setSelectedResident, removeResident } = useResidents();
	const [isOpen, setIsOpen] = useState(false);
	const [localLoading, setLocalLoading] = useState(false);
	

	const handleDelete = async () => {
		setLocalLoading(true);
        if (!selectedResident?.id) return; // Should never happen but just in case
        
        // TODO: Add confirmation dialog before deleting
        // TODO: Check if User is able to delete resident (Add Role Check)
        await removeResident(selectedResident.id);
        setSelectedResident(null);
		setLocalLoading(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <CustomButton text="Delete Resident" variant="destructive" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-dialog-bg border-2 border-dialog-border">
				{localLoading && <LoadingSpinner />}
                <DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border">
                    <DialogTitle className="text-dialog-title text-xl font-semibold">Are you sure you want to delete this resident?</DialogTitle>
                </DialogHeader>
				<DialogDescription className="text-dialog-text">This action is irreversible.</DialogDescription>
                <DialogFooter>
                    <CustomButton text="Delete Resident" variant="destructive" onClick={handleDelete} />
					<CustomButton text="Cancel" variant="default" onClick={() => setIsOpen(false)} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}