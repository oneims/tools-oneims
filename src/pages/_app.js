import "react-loading-skeleton/dist/skeleton.css";
import "../styles/style.scss";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
