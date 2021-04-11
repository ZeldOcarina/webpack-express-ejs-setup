import "./scss/index.scss";
import "./_alert.js";

console.log("ciao!");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
