export default function InputComponent({ children, type, change, id }) {
  return (
    <div className="mb-4 ">
      <label className="mx-2" htmlFor={id}>{children}</label>
      <input
        name={id}
        onChange={change}
        type={type}
        className="text-black p-3 outline-none w-[75%] rounded-md"
        required
      />
    </div>
  );
}