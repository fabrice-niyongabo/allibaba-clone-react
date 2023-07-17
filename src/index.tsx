import { Suspense } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-phone-number-input/style.css";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Loader from "./layouts/loader/Loader";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Store, persistor } from "./store";

const AppWithRedux = () => (
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <AppWithRedux />
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
