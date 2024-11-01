// TODO: Add routes for the links | Maybe use Nav as well
// TODO: Add Icons to the links
// TODO: Add a way to minimize the side manager | Show only icons and probably have a hover effect to show the text
export default function SideManager() {
    return (
      <div className="flex flex-col w-64 bg-blue-00 text-white shadow-md"> 
        <h1 className="text-2xl font-bold mb-4">Manage My Residents</h1>    
          <ul>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">Home</li>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">Account</li>
            <li className="p-4 hover:bg-blue-800 cursor-pointer">SignOut</li>
          </ul>
      </div>
    )
  }