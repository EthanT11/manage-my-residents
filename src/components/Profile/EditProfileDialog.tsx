import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSupabase, { Profile } from '@/hooks/useSupabase';

interface EditProfileDialogProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const EditProfileDialog = ({ profile, setProfile }: EditProfileDialogProps) => {
  const currentProfile = profile;
  const { updateProfileData } = useSupabase();
  const [Loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleUpdateProfile = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const profile: Profile = {
      first_name: (document.getElementById('first_name') as HTMLInputElement).value,
      last_name: (document.getElementById('last_name') as HTMLInputElement).value,
      home_name: (document.getElementById('home_name') as HTMLSelectElement).value,
      position: (document.getElementById('position') as HTMLSelectElement).value,
    };
    setLoading(true);
    await updateProfileData(profile);
    setProfile(profile);
    setLoading(false); // TODO: Add visual loading indicator
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-700">Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-600 mb-4">Fill in the information below.</DialogDescription>
        <form onSubmit={handleUpdateProfile} className="grid gap-6">
          <div>
            <Label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</Label>
            <Input id="first_name" type="text" defaultValue={currentProfile.first_name ?? ''} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div>
            <Label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</Label>
            <Input id="last_name" type="text" defaultValue={currentProfile.last_name ?? ''} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
          </div>
          <div>
            <Label htmlFor="home_name" className="block text-sm font-medium text-gray-700">Personal Care Home</Label>
            <select id="home_name" defaultValue={currentProfile.home_name ?? ''} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="home_name_1">PCH #1</option>
              <option value="home_name_2">PCH #2</option>
              <option value="home_name_3">PCH #3</option>
            </select>
          </div>
          <div>
            <Label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</Label>
            <select id="position" defaultValue={currentProfile.position ?? ''} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="PCA">PCA</option>
              <option value="Medroom">Medroom</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;