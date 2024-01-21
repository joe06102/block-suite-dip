import "umi/typings";

declare global {
  export interface IBaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
  }
}
