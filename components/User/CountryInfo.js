export default function CountryInfo({ sheet = "", userData }) {
	const country = (userData?.data.country ?? "").toUpperCase();
	return (
		<div className="flex items-center justify-between">
			<div>{country}</div>
			{sheet}
		</div>
	);
}
