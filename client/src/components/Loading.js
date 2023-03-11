import loading from "../assets/loading.svg";
const Loading = ({ classname }) => {
  return (
    <div className={classname}>
      <img src={loading} alt="" />
    </div>
  );
};
export default Loading;
