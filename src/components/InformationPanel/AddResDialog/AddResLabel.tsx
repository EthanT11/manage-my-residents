import { Label } from "../../ui/label";


export default function AddResLabel( {children, htmlFor, className} : {children: string, htmlFor: string, className: string} ) {
  return (
	<Label htmlFor={htmlFor} className={className}>
	  {children}
	</Label>
  );
}