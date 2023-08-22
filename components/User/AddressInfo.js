export default function AddressInfo({ sheet = "" }) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex w-10/12 flex-wrap">
				18 Saxon Lane Wausau, WI 54401 18 Saxon Lane Wausau, WI 54401 18 Saxon Lane Wausau, WI 54401
			</div>
			{sheet}
		</div>
	);
}
