import { Label } from "../ui/label";


export default function CustomLabel( {children, htmlFor, className} : {children: string, htmlFor: string, className: string} ) {
  return (
	<Label htmlFor={htmlFor} className={className}>
	  {children}
	</Label>
  );
}