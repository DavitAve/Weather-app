import { FunctionComponent } from "react";
import LoadingImg from "../../assets/gifs/loading-cloud.gif";

interface ILoadingProps {
  size?: string;
}

const Loading: FunctionComponent<ILoadingProps> = ({ size = "80" }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: size + "px", height: size + "px" }}
    >
      <img src={LoadingImg} alt="" className="ibg w-[200%] h-[200%]" />
    </div>
  );
};

export default Loading;
