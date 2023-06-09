import { FC } from "react";

import UserWeather from "../UserWeather";

const HomePage: FC = () => {
  return (
    <div className="py-3">
      <div className="container">
        <UserWeather />
      </div>
    </div>
  );
};

export default HomePage;
