export default function LanguageInfo({ sheet = "" }) {
  return (
    <div className="flex justify-between items-center">
      <div>Traditional Chinese</div>
      {sheet}
    </div>
  );
}
