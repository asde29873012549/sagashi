export default function AddressInfo({ sheet = "" }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap w-10/12">
        18 Saxon Lane Wausau, WI 54401 18 Saxon Lane Wausau, WI 54401 18 Saxon
        Lane Wausau, WI 54401
      </div>
      {sheet}
    </div>
  );
}
