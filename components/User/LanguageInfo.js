export default function LanguageInfo({ sheet = "" }) {
	return (
		<div className="flex items-center justify-between">
			<div>English</div>
			{sheet}
		</div>
	);
}
