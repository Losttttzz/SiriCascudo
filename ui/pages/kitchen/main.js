import { createHttpService } from "./scripts/http-service.js";
import { startInteractionListener } from "./scripts/interaction-listener.js";
import { startKitchen } from "./scripts/kitchen.js";
import { startRenderer } from "./scripts/renderer.js";

const requestedBurgers = Math.ceil(Math.random() * 5)
const kitchen = startKitchen(requestedBurgers);

const renderer = startRenderer(kitchen.state);

renderer.renderScreen();
const interactions = startInteractionListener();

const httpService = createHttpService();

kitchen.subscribe(renderer.handleNotification);
kitchen.subscribe(httpService.handleNotification);
interactions.subscribe(kitchen.handleNotification);
renderer.subscribe(kitchen.handleNotification);