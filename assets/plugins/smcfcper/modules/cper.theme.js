const cssPath = "../../../stylesheets/";
import main from cssPath + "style.css" with {type: "css"};
import dark from cssPath + "dark.css" with {type: "css"};
import light from cssPath + "light.css" with {type: "css"};

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
	document.adoptedStyleSheets = e.matches? dark: light;
});

export const change = (name) => {

}
