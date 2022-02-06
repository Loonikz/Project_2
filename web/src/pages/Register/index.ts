import "./styles.scss"
import {onTheme} from "../../logic/header/theme";

function init() {
  onTheme();
}
document.addEventListener('DOMContentLoaded', function () {
  init();
});
