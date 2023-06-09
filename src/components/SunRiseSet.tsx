import { FunctionComponent } from "react";
import SunriseImg from "../assets/images/sunrise.svg";
import SunsetImg from "../assets/images/sunset.svg";
import moment from "moment";

interface ISunRiseSetProps {
  rise: number;
  set: number;
}

const SunRiseSet: FunctionComponent<ISunRiseSetProps> = ({
  rise = 0,
  set = 0,
}) => {
  const formattedTime = (time: number) => {
    return moment.unix(time).format("HH:mm");
  };

  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 flex flex-col gap-3">
          <img src={SunriseImg} className="ibg w-full h-full" />
        </div>
        <div className="flex items-center">
          <div className="text-xl font-geologica font-medium mr-1">
            Sunrise:
          </div>
          <div>{formattedTime(rise)}</div>
        </div>
      </div>
      <div className="flex flex-col  items-center">
        <div className="relative w-16 h-16">
          <img src={SunsetImg} alt="" className="ibg w-full h-full" />
        </div>
        <div className="flex items-center">
          <div className="text-xl font-geologica font-medium mr-1">Sunset:</div>
          <div>{formattedTime(set)}</div>
        </div>
      </div>
    </div>
  );
};

export default SunRiseSet;
