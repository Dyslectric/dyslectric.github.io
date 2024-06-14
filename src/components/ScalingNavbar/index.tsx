import { FC, ReactNode, createContext } from "react";

export const ScalingNavbarContext = createContext({
  animation: 0,
});

export interface ScalingNavbarProps {
  size: number;
  animation: number;
  children: ReactNode;
}

export const ScalingNavbar: FC<ScalingNavbarProps> = ({
  size,
  animation,
  children,
}) => {
  return (
    <ScalingNavbarContext.Provider value={{ animation }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100vw",
          height: `${100 - animation * (1 - size) * 100}vh`,
          backgroundColor: "rgba(0, 0, 0, 0)",
          zIndex: 2,
        }}
      >
        {children}
      </div>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          opacity: 0,
        }}
      ></div>
    </ScalingNavbarContext.Provider>
  );
};
