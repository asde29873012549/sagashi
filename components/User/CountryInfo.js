export default function CountryInfo({ sheet = "" }) {
  return (
    <div className="flex justify-between items-center">
      <div>Taiwan</div>
      {sheet}
    </div>
  );
}
