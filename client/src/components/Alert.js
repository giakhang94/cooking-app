const Alert = ({ alertType, alertText }) => {
  return (
    <div className="w-full mb-3">
      <span
        className={`${
          alertType === "success"
            ? "bg-green-200 text-green-600"
            : "bg-red-200 text-red-600"
        } py-2 w-full max-w-[300px] text-center block`}
      >
        {alertText}
      </span>
    </div>
  );
};
export default Alert;
