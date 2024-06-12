import { useState } from "react";

interface ExpandableTextProps {
  children: string;
  maxChars: number;
}

const ExpandableText = ({ children, maxChars = 10 }: ExpandableTextProps) => {
  const [isExpanded, SetIsExpanded] = useState(false);

  if (children.length <= maxChars) {
    return <p>{children}</p>;
  }
  let text = isExpanded ? children : children.substring(0, maxChars);
  return (
    <>
      <div>
        {text}...
        <button onClick={() => SetIsExpanded(!isExpanded)}>
          {isExpanded ? "Less" : "More"}
        </button>
      </div>
    </>
  );
};

export default ExpandableText;
