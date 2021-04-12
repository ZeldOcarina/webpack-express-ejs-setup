import "./scss/index.scss";
import "./_alert.js";

console.log("ciao!");

if (import.meta.webpackHot) {
  console.log("HOT!");
  import.meta.webpackHot.accept();
}
