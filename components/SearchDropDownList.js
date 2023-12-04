export function DropDownItem({ children, onClick }) {
	return (
		<div
			className="flex items-center rounded px-1 py-1 font-light hover:cursor-pointer hover:bg-slate-100"
			onClick={onClick}
		>
			<div className="text-base text-slate-600">{children}</div>
		</div>
	);
}

export function DropDownGroup({ children, title }) {
	return (
		<div>
			<div className="px-1 py-2 text-sm text-slate-400">{title}</div>
			<div>{children}</div>
		</div>
	);
}

export function DropDown({ children, className = "" }) {
	return <div className={`!mt-0 px-2 pb-1 ${className}`}>{children}</div>;
}
