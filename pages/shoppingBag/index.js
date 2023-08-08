import OderItem from '@/components/OrderItem'

export default function ShoppingBag () {
	return (
		<div className="flex flex-col md:flex-row p-4">
			<div className="text-2xl font-bold">SHOPPING BAG</div>
			<OderItem/>
		</div>
	)
}