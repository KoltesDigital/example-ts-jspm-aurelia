import { bootstrap } from "aurelia-bootstrapper";
import { Aurelia, LoaderPlugin } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { Loader } from "aurelia-loader";
import "aurelia-framework";
import "aurelia-pal-browser";

class CustomLoader extends Loader {
  private modules: any = {};

  map(id: string, source: string): void {}

  normalizeSync(moduleId: string, relativeTo: string): string {
    return moduleId;
  }

  normalize(moduleId: string, relativeTo: string): Promise<string> {
    return Promise.resolve(moduleId);
  }

  loadModule(id: string): Promise<any> {
    return import(id);
  }

  loadAllModules(ids: string[]): Promise<any[]> {
    return Promise.all(ids.map(id => this.loadModule(id)));
  }

  loadTemplate(url: string): Promise<TemplateRegistryEntry> {
    throw new Error("Loader must implement loadTemplate(url).");
  }

  loadText(url: string): Promise<string> {
    throw new Error("Loader must implement loadText(url).");
  }

  applyPluginToUrl(url: string, pluginName: string): string {
    return `${pluginName}!${url}`;
  }

  addPlugin(pluginName: string, implementation: LoaderPlugin): void {
    throw new Error(
      "Loader must implement addPlugin(pluginName, implementation)."
    );
  }
}

PLATFORM.Loader = CustomLoader;

bootstrap(function(aurelia: Aurelia) {
  aurelia.use.standardConfiguration().developmentLogging();

  aurelia.start().then(() => aurelia.setRoot("./app", document.body));
});
