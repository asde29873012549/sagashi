export default function ProfileInfo({ sheet = "" }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center w-5/6 md:w-2/5">
        <div className="w-fit">
          <div>NAME</div>
          <div>EMAIL</div>
          <div>DATE OF BIRTH</div>
          <div>GENDER</div>
        </div>
        <div className="w-fit text-info">
          <div>Noah</div>
          <div className="truncate">12345@gmail.com</div>
          <div>1997/05/31</div>
          <div>MALE</div>
        </div>
      </div>
      {sheet}
    </div>
  );
}
