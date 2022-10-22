import { ReactElement } from "react";

interface TokenProps {
  onClick: (event: any) => void;
  text: string | null;
  key: number;
  value: number;
}

const Token = ({ onClick, text, key, value }: TokenProps): ReactElement => {
  return (
    <button
      className="w-16 h-16 border border-black"
      onClick={onClick}
      key={key}
      value={value}
    >
      {text}
    </button>
  );
};

export default Token;
