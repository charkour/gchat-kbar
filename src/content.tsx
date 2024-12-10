/* @refresh reload */
import { render } from "solid-js/web";
import { MetaProvider, Style } from "@solidjs/meta";

import "./index.css";

const root = document.createElement("div");
root.id = "crx-root";
document.body.append(root);

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

// NOTE: this app is running in multiple places; within each iframe. We'll need to determine it's context
const App = () => {
    const body = document.querySelector('body');
    const className = body?.className;
    console.log(body)

    const firstDivWithStyle = document.querySelector('div[style="position: relative; min-height: 100%;"]');
    // console.log({ firstDivWithStyle });
    if (firstDivWithStyle) {
        firstDivWithStyle.id = 'test-id';
    }

    const iframe = document.querySelector('#test-id iframe[title="Chat content"]')
    // console.log({ iframe })
    const iframeContentDocument = document.querySelector('#test-id iframe[title="Chat content"]')
    // if (iframe) {
    //     iframe.setAttribute('style', 'border-style: none;width: 100%; height: 120px;')
    // }

    const foo = document.createElement("style");
    foo.innerText = "* { background-color: blue; }"
    body?.appendChild(foo);

    // console.log(iframe?.children)
    // console.log(iframe?.contentDocument)

    return (
  <MetaProvider>
    <Style type="text/css" data-late-css>
      {`
    #test-id header {
        background-color: green !important;
    }
    #test-id [role="navigation"] {
        background-color: blue;
    }
    #test-id iframe[title="Chat content"] * {
      background-color: blue !important;
     }
    `}
    </Style>
  </MetaProvider>
)};

render(() => <App />, root);
