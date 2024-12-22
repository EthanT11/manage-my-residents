import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CustomButton } from '@/components/Common';
import FormField from './FormField';
import DialogSectionHeader from './DialogSectionHeader';
import useSupabase, { Profile } from '@/hooks/useSupabase';

interface EditProfileDialogProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const EditProfileDialog = ({ profile, setProfile }: EditProfileDialogProps) => {
  const { updateProfileData } = useSupabase();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    home_name: profile.home_name || '',
    position: profile.position || ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileData(profileForm);
    setProfile(profileForm);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <CustomButton text="Edit Profile" variant="outline" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-dialog-bg border-2 border-dialog-border">
        <DialogHeader className="bg-dialog-bg p-4 rounded-t-lg border-b border-dialog-border">
          <DialogTitle className="text-dialog-title text-xl font-semibold">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-dialog-text">
            Update your profile information below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4 p-6 bg-dialog-bg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DialogSectionHeader title="Personal Information" />
              <FormField 
                name="first_name"
                label="First Name"
                type="text"
                placeholder="Enter First Name"
                value={profileForm.first_name}
                onChange={handleChange}
              />
              <FormField 
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="Enter Last Name"
                value={profileForm.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-4">
              <DialogSectionHeader title="Work Information" />
              <FormField 
                name="home_name"
                label="Personal Care Home"
                type="text"
                placeholder="Select Home"
                value={profileForm.home_name}
                onChange={handleChange}
                fieldType="dropdown"
                options={["home_name_1", "home_name_2", "home_name_3"]}
              />
              <FormField 
                name="position"
                label="Position"
                type="text"
                placeholder="Select Position"
                value={profileForm.position}
                onChange={handleChange}
                fieldType="dropdown"
                options={["PCA", "Medroom", "Manager"]}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4 pt-4 border-t border-dialog-border">
            <CustomButton 
              type="submit" 
              text="Save Changes" 
              variant="outline"
              className="bg-button-bg text-button-text border border-button-border hover:bg-button-hover px-6" 
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;