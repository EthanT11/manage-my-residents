export default function AddSectionHeader({ title }: { title: string }) {
	return (
		<h3 className="text-dialog-title font-semibold border-b border-dialog-border pb-2">
			{title}
		</h3>
	)
}