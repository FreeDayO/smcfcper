## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-9mu2JKpUImscOMmwjm1y6MA2YsW3amSoFNYwKeUHxaXYKQ1naywWmamEGMdviEen"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-7hMYwsnoFLW0Wnjv4vRnZxuedW1tCz7/pydl1b9w3fg7B+rldToCjqzXwCRHUE7C /es/languages/ini.js
sha384-LDu6uT3diI3jBUJtdoGFa787cYlVrR+aqFfmW+kW+TImOkpVe+P5LBdDzydIHo9Z /es/languages/ini.min.js
sha384-JSUMPR+WT0h/7NlqXi1Al9bVlNT31AeZNpAHttuzu+r02AmxePeqvsZkKqYZf06n /languages/ini.js
sha384-QrHbXsWtJOiJjnLPKgutUfoIrj34yz0+JKPw4CFIDImvaTDQ/wxYyEz/zB3639vM /languages/ini.min.js
sha384-WlJif3hSQmKQBM0wKXtpRKFEb/e0C3zSsDlsCIwSdrzH0Kx66ZBabmHNHi+gyiSJ /highlight.js
sha384-GBXJR39iLEyQTZQMtCZWSBZIEcXbHBYHnd4mNFkGDFU1i9D/2kZ4YVpVnQKOXIst /highlight.min.js
```

