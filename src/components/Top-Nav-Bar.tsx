// TODO add functionality to the home and login button
export default function TopNavBar() {
  return (
    <nav className="bg-blue-600 p-4 w-full font-roboto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Manage My Residents
        </div>
        <div className="space-x-4">
          <button>Home</button>
          <button>Login</button>
        </div>
      </div>
    </nav>
  );
};