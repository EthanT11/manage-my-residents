import { DialogSectionHeader } from ".";
import { CustomButton } from "../Common";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

export default function EditResDialog() {
	
	const handleUpdateResident = async (e: React.FormEvent) => {
		// TODO: Add update resident logic
	};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CustomButton 
					text="Edit Resident" 
					variant="default" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-dialog-bg border-2 border-dialog-border">
                <DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border">
                    <DialogTitle className="text-dialog-title text-xl font-semibold">
                        Edit Resident
                    </DialogTitle>
                    <DialogDescription className="text-dialog-text">
                        Edit the resident's details
                    </DialogDescription>
                </DialogHeader>
				<form className="flex flex-col gap-4 p-6 bg-dialog-bg">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<DialogSectionHeader title="Personal Information" />
						</div>
					</div>
				</form>
            </DialogContent>
        </Dialog>
    )
}	