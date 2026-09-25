import { Home } from "./Home"
import { useEffect } from "react";
function App() {


async function setFullScreen(e) {
  if (e.target !== document.body) return;

  if (window.matchMedia("(orientation: portrait)").matches) {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();

      window.location.hash = "fullscreen";

      try {
        await screen.orientation.lock("landscape");
      } catch (err) {
        console.log("Could not lock orientation:", err);
      }
    }
  }
}

useEffect(() => {
  const handleFullscreenChange = () => {
    if (!document.fullscreenElement && window.location.hash === "#fullscreen") {
      history.back();
    }
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
  };
}, []);

useEffect(() => {

  document.body.addEventListener("click", setFullScreen);

  return () => {
    document.body.removeEventListener("click", setFullScreen);
  };
}, []);

  return (
    <Home>
      
    </Home>
  )
}

export default App
