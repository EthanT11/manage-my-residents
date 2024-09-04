import { Button } from "./ui/button";

export default function AddResidentButton({text}: {text: string}) {
  return (
    <>
	  <Button className="bg-white hover:bg-blue-600 hover:text-white">{text}</Button>
  		{/* <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-blue-50 transition duration-300">
		  Add Resident
		</button> */}
    </>
  );
}