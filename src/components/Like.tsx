import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

interface LikeProps {
  onClick: () => void;
}

const Like = ({ onClick }: LikeProps) => {
  const [status, setStatus] = useState(false);
  function handleClick() {
    setStatus(!status);
    onClick();
  }

  if (!status) {
    return (
      <div>
        <CiHeart onClick={handleClick} />
      </div>
    );
  }
  return (
    <div>
      <FaHeart color="#ff6b81" onClick={handleClick} />
    </div>
  );
};

export default Like;
