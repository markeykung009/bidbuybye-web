export default function ButtonProduct({
  onClick,
  children,
  className,
  isDisabled
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${className} flex justify-center rounded-md border border-transparent py-2 px-4 text-sm w-[300px] font-medium text-white `}
      type="button"
    >
      {children}
    </button>
  );
}
