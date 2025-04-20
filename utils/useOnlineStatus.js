import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine); // Use initial value from navigator

  useEffect(() => {
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;








// import { useState, useEffect } from "react";

// const useOnlineStatus = () => {
//   const [onlineStatus, setOnlineStatus] = useState(true);

//   useEffect(() => {
//     window.addEventListener("offline", () => {
//       setOnlineStatus(false);
//     });

//     window.addEventListener("online", () => {
//       setOnlineStatus(true);
//     });
//   }, []);

//   return onlineStatus;
// };

// export default useOnlineStatus;
