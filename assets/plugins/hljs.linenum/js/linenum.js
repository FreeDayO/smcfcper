(function (w, d) {
    if (w.hljs) {
        w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
        w.hljs.addLineNumbersForCode = addLineNumbersForCode;
        w.hljs.reloadLineNum = documentReady;
    } else {
        w.console.error('highlight.js not detected!');
    }

    function initLineNumbersOnLoad() {
        if (d.readyState === 'interactive' || d.readyState === 'complete') {
            documentReady();
        } else {
            w.addEventListener('DOMContentLoaded', function () {
                documentReady();
            });
        }
    }

    function addLineNumbersForCode(html) {
        var num = 1;
        html = '<span  data-num="' + num + '"></span>' + html;
        html = html.replace(/\r\n|\r|\n/g, function (a) {
            num++;
            return a + '<span  data-num="' + num + '"></span>';
        });
        html = '<span ></span>' + html;
        return html;
    }

    function documentReady() {
        var elements = d.querySelectorAll('.hljs');
        for (let element of elements) {
        	if (!(element.hasAttribute("nonum"))) {
            	if (element.className.indexOf('hljs-ln') == -1) {
                	var html = element.innerHTML;
                	html = addLineNumbersForCode(html);
                	element.innerHTML = html;
                	element.classList.add('hljs-ln');
            	}
        	}
        }
    }
}(window, document));