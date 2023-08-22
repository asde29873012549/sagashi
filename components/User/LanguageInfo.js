export default function LanguageInfo({ sheet = "" }) {
	return (
		<div className="flex items-center justify-between">
			<div>Traditional Chinese</div>
			{sheet}
		</div>
	);
}
