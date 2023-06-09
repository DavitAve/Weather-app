import { FunctionComponent, useCallback, useEffect, useState } from "react";

interface IWheatherImgProps {
  img: string;
}

const WheatherImg: FunctionComponent<IWheatherImgProps> = ({ img }) => {
  const [src, setSrc] = useState<string>("");

  const dynamicPath = useCallback(() => {
    if (img) {
      import(`../assets/gifs/${img}.gif`)
        .then((image) => setSrc(image.default))
        .catch((error) => console.error(error));
    }
  }, [img]);

  useEffect(dynamicPath, [img]);

  return (
    <div className="relative w-24 h-24">
      <img src={src} alt="" className="ibg w-full h-full" />
    </div>
  );
};

export default WheatherImg;
