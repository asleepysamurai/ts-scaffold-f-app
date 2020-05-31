/**
 * Application Entry Point
 */

import { BlueJacket, Context } from 'bluejacket';
import { getRouteFromLocation, redirectTo, getURLFromRouteAndCurrentLocation } from 'utils/url';
import { env } from 'utils/environment';
import Debug from 'debug';
import * as routes from 'routes';

const log = Debug('f-app:index');

const hijackLinks = (router: BlueJacket) => {
  function route(ev: Event) {
    let node: HTMLAnchorElement = ev.currentTarget as HTMLAnchorElement;
    if (!node) {
      return;
    }

    let href = node.getAttribute('href');
    if (!href) {
      return;
    }

    let target = node.getAttribute('target');
    if (!target || ['_self', '_parent', '_top'].includes(target)) {
      router.resolve(href);
    } else {
      window.open(href);
    }

    ev.preventDefault();
  }

  function safeAddEventListener(
    event: string,
    listener: (ev: Event) => void,
    node: HTMLAnchorElement,
  ) {
    node.removeEventListener(event, listener);
    node.addEventListener(event, listener);
  }

  const observer = new MutationObserver(() => {
    const routeLinks = safeAddEventListener.bind(null, 'click', route);
    document.querySelectorAll('a').forEach(routeLinks);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
};

const hijackNavigation = (router: BlueJacket) => {
  window.addEventListener('popstate', (event) => {
    router.resolve(
      getRouteFromLocation(document.location),
      Object.assign({}, event.state, { skipHistoryChange: true }),
    );
  });

  router.handle((context: Context) => {
    if (context.skipHistoryChange) {
      return;
    }

    const url = getURLFromRouteAndCurrentLocation(context.route, window.location);
    history.pushState(context.historyState || {}, '', url);
  });
};

const setupDefaultRoute = (router: BlueJacket) => {
  router.handle('/', redirectTo(env.get('APP_SERVER_DEFAULT_URL')));
};

const initRoutes = async (router: BlueJacket) => {
  hijackLinks(router);
  setupDefaultRoute(router);

  await Promise.all(
    Object.values(routes).map((init) => {
      return Promise.resolve(init(router));
    }),
  );

  hijackNavigation(router);
};

const init = async () => {
  const router = new BlueJacket({
    mixins: {},
  });

  try {
    await initRoutes(router);

    await router.resolve(getRouteFromLocation(window.location));
  } catch (err) {
    log(err);
  }
};

init();
