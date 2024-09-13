import { createContext, useContext, useEffect, useState } from "react";

const ModalContext = createContext();
export const useModalContext = () => {
  return useContext(ModalContext);
};
const ModalProvider = ({ children }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [content, setContent] = useState();
  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShowing]);
  const openPopup = (content) => {
    setIsShowing(true);
    setContent(content);
  };
  return (
    <ModalContext.Provider value={{ openPopup }}>
      {children}
      {isShowing && (
        <div className="fixed inset-0">
          <div
            className="absolute inset-0 bg-slate-600/50 flex items-center justify-center"
            onClick={() => {
              setIsShowing(false);
            }}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
