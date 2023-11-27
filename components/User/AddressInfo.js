import { useQuery } from "@tanstack/react-query";
import getAddress from "@/lib/queries/fetchQuery";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import generalFetch from "@/lib/queries/fetchQuery";
import { useToast } from "@/components/ui/use-toast";
import { personalInfoUpdateSuccess, genericError } from "@/lib/userMessage";

export default function AddressInfo({ sheet = "", userData, setFeature, setAddressData, setOpen }) {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const username = userData.data.username;
	const { data: addressData } = useQuery({
		queryKey: ["addressData"],
		queryFn: () => getAddress({ uri: `/user/${username}/shippingAddress` }),
		refetchOnWindowFocus: false,
	});

	const { mutateAsync: mutateAddress } = useMutation({
		mutationFn: (id) =>
			generalFetch({
				uri: `/user/${username}/shippingAddress/${id}`,
				method: "DELETE",
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addressData"] });
			toast({
				title: personalInfoUpdateSuccess.title,
				description: personalInfoUpdateSuccess.desc,
				status: personalInfoUpdateSuccess.status,
			});
		},
		onError: () => {
			toast({
				title: "Failed !",
				description: genericError,
				status: "fail",
			});
		},
	});

	const onEditAddress = (addressData) => {
		setOpen(true);
		setFeature("Edit Address");
		setAddressData(addressData);
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex w-10/12 flex-wrap">
				{addressData?.data.length === 0 && (
					<div className="w-fit text-info">
						No Personal Shipping Address, Please Consider Adding One
					</div>
				)}
				{addressData?.data.map((address, index) => {
					return (
						<div
							className="flex w-full items-center justify-between"
							key={`${index}-${address}-addr`}
						>
							<div className="mb-4 flex flex-col items-start">
								<div className="my-2 flex font-semibold">
									<Dot color="#0c4a6e" strokeWidth={3} />
									<span className="text-sky-900">ADDRESS {index + 1}</span>
								</div>
								<div className="ml-6 flex w-fit space-x-4 text-info">
									<span className="w-20 text-foreground">Address</span>
									<span>{address.address}</span>
								</div>
								<div className="ml-6 flex w-fit space-x-4 text-info">
									<span className="w-20 text-foreground">City</span>
									<span>{address.city}</span>
								</div>
								<div className="ml-6 flex w-fit space-x-4 text-info">
									<span className="w-20 text-foreground">Country</span>
									<span>{address.country}</span>
								</div>
							</div>
							<div className="space-x-3">
								<Button className="h-8 bg-sky-900" onClick={() => onEditAddress(address)}>
									Edit
								</Button>
								<Button
									variant="outline"
									className="h-8 border-rose-800/90 text-rose-800/90 hover:bg-rose-800/90 hover:text-white"
									onClick={() => mutateAddress(address.id)}
								>
									Delete
								</Button>
							</div>
						</div>
					);
				})}
			</div>
			{sheet}
		</div>
	);
}
