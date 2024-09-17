import { Label } from "../../ui/label";


export default function AddResLabel( {children, htmlFor} : {children: string, htmlFor: string} ) {
  return (
	<Label htmlFor={htmlFor} className="text-white">
	  {children}
	</Label>
  );
}