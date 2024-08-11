export default function InputComponent({ children, type, change, id }) {
  return (
      <div className="">
      <label className="font-semibold text-xl" htmlFor={id}>{children}</label>
      <input
        name={id}
        onChange={change}
        type={type}
        className="text-black p-3 outline-none w-full rounded-md mb-4"
        required
      />
      </div>
  );
}