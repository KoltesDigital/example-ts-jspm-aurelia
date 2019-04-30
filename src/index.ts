import { bootstrap } from "aurelia-bootstrapper";

bootstrap(function(aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();

  aurelia.start().then(() => aurelia.setRoot("./dist/app", document.body));
});
