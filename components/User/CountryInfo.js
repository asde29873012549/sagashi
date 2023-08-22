export default function CountryInfo({ sheet = "" }) {
	return (
		<div className="flex items-center justify-between">
			<div>Taiwan</div>
			{sheet}
		</div>
	);
}
