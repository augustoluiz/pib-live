// Compiled using marko@4.19.9 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/pib-live$1.0.0/src/app/views/home.marko",
    marko_renderer = require("marko/src/runtime/components/renderer"),
    marko_loadTag = require("marko/src/runtime/helpers/load-tag"),
    component_globals_tag = marko_loadTag(require("marko/src/core-tags/components/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/core-tags/components/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/core-tags/core/await/reorderer-renderer"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><title>Pib-live</title><link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\"><link rel=\"stylesheet\" href=\"/estatico/css/home.css\"></head><body class=\"text-center\">");

  component_globals_tag({}, out);

  out.w("<form class=\"form-signin\" action=\"/live-status\" method=\"POST\"><img class=\"rounded-circle\" src=\"/estatico/img/logo.jpg\" alt width=\"132\" height=\"132\"><h1 class=\"h3 mb-3 font-weight-bold\">Link OBS</h1><div class=\"row\"><div class=\"col-9\"><input class=\"form-control\" tye=\"text\" id=\"obslink\" name=\"obslink\" value=\"rtmp://localhost/live\" required></div><div class=\"col-3\"><button class=\"btn btn-outline-secondary\" type=\"button\" onclick=\"copiaTexto()\">Copiar</button></div></div><br><hr><h1 class=\"h3 mb-3 font-weight-normal\">Youtube</h1><input class=\"form-control\" tye=\"text\" id=\"ytlink\" name=\"ytlink\" placeholder=\"URL de stream\" required><input class=\"form-control\" type=\"password\" id=\"ytkey\" name=\"ytkey\" placeholder=\"Chave de transmissão\" required><h1 class=\"h3 mb-3 font-weight-normal\">Facebook</h1><input class=\"form-control\" type=\"text\" id=\"fblink\" name=\"fblink\" placeholder=\"URL de stream\" required><input class=\"form-control\" type=\"password\" id=\"fbkey\" name=\"fbkey\" placeholder=\"Chave de transmissão\" required><button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Iniciar</button><p class=\"mt-3 mb-1 text-muted\"><a href=\"https://www.facebook.com/pibitaimigrejabatista\" target=\"_blank\">pibitaim - 2020</a></p><p class=\"mt-1 mb-3 text-muted\"><a href=\"https://github.com/augustoluiz\" target=\"_blank\">augustoluiz</a></p></form><script src=\"/estatico/js/home.js\"></script><script src=\"https://code.jquery.com/jquery-3.4.1.slim.min.js\" integrity=\"sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n\" crossorigin=\"anonymous\"></script><script src=\"https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js\" integrity=\"sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo\" crossorigin=\"anonymous\"></script><script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js\" integrity=\"sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6\" crossorigin=\"anonymous\"></script>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "27");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.meta = {
    id: "/pib-live$1.0.0/src/app/views/home.marko",
    tags: [
      "marko/src/core-tags/components/component-globals-tag",
      "marko/src/core-tags/components/init-components-tag",
      "marko/src/core-tags/core/await/reorderer-renderer"
    ]
  };
