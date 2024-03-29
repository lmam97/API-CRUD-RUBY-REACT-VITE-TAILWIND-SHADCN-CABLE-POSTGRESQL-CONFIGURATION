// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'




import "@/compiled/stylesheets/app.compiled.css";
import LayoutApp from "@/pages/Layouts/App";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

const pages = import.meta.glob("../pages/**/*.jsx");

createInertiaApp({
  resolve: name => {
    let page;
    if(name.startsWith("@")){
      const pathWithFile = name.substring(1);
      page = pages[`../pages/${pathWithFile}.jsx`]();
    } else {
      const nameBits = name.split("/").join("_").split("_");
      const realPath = nameBits.map(x => x.charAt(0).toUpperCase() + x.slice(1)).join("/");
      const fileName = nameBits.length <= 2 && !nameBits.includes("index") ? "/Index" : ""
      
      if(pages[`../pages/${realPath}${fileName}.jsx`] === undefined){
        console.error(`Page not found: ${realPath}${fileName}.jsx`)
      } else {
        page = pages[`../pages/${realPath}${fileName}.jsx`]();
      }
    }

    page.then((x) => {
      x.default.layout = x.default.layout || LayoutApp;
    });

    return page;
  },
  setup ({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});