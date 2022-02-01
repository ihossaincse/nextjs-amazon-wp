import reducer, { initialState } from "../reducer";
import { StateProvider } from "../StateProvider";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
  <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
  </StateProvider>)
}

export default MyApp
