import type React from "react";
import styles from "./DivisionBracket.module.css";

const DivisionBracket: React.FC = () => (
  <svg
    width="20em"
    height="5em"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={styles.bracketStroke}
      d="
      M 100 2
      L 0 2
      Q 10 18 0 50
      "
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default DivisionBracket;
