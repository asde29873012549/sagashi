export default function ProfileInfo({ sheet = "", userData }) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex w-5/6 flex-col md:w-2/5">
				<div className="flex justify-between">
					<div className="w-fit">NAME</div>
					<div className="w-fit text-info">{userData?.data.fullname}</div>
				</div>
				<div className="flex justify-between">
					<div className="w-fit">EMAIL</div>
					<div className="w-fit text-info">{userData?.data.email}</div>
				</div>
				<div className="flex justify-between">
					<div className="w-fit">DATE OF BIRTH</div>
					<div className="w-fit text-info">{userData?.data.birth_date}</div>
				</div>
				<div className="flex justify-between">
					<div className="w-fit">GENDER</div>
					<div className="w-fit text-info">{userData?.data.gender}</div>
				</div>
			</div>
			{sheet}
		</div>
	);
}
