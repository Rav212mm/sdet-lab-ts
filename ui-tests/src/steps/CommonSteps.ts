import { Given } from '@cucumber/cucumber';
import { PlaywrightWorld } from '../world/PlaywrightWorld';

// Odpowiednik CommonSteps.java — wspólny krok nawigacji
// W TS/Cucumber nie potrzebujemy konstruktora — World jest shared przez `this`
Given('the user is on the SauceDemo login page', async function(this: PlaywrightWorld) {
  await this.loginPage.navigate();
});