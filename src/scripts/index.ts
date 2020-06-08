/**
 * Application Entry Point
 */

import { BlueJacket, Context } from 'bluejacket';
import { env } from 'utils/environment';
import { mixins, Mixins } from 'utils/mixins';
import Debug from 'debug';
import { routes } from 'routes';

const log = Debug('f-app:index');

const hijackLinks = (router: BlueJacket<Mixins>) => {
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
    if (target && ['_self', '_parent', '_top'].includes(target)) {
      window.open(href);
    } else if (href.match(/^https?:\/\//)) {
      window.location.href = href;
    } else {
      router.resolve(href);
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

const hijackNavigation = (router: BlueJacket<Mixins>) => {
  window.addEventListener('popstate', (event) => {
    router.resolve(
      mixins.getRouteFromLocation(document.location),
      Object.assign({}, event.state, { historyChange: 'skip' }),
    );
  });

  router.handle((context: Context<Mixins>) => {
    if (context.data.historyChange === 'skip') {
      return;
    }

    const url = context.getURLFromRouteAndCurrentLocation(context.route, window.location);
    history[context.data.historyChange === 'replace' ? 'replaceState' : 'pushState'](
      context.data.historyState || {},
      '',
      url,
    );
  });
};

const setupDefaultRoute = (router: BlueJacket<Mixins>) => {
  router.handle('/', mixins.redirectTo(env.get('APP_SERVER_DEFAULT_URL')));
};

const setupComponentRenderer = (router: BlueJacket<Mixins>) => {
  router.handle((context) => {
    context.render();
  });
};

const initRoutes = async (router: BlueJacket<Mixins>) => {
  hijackLinks(router);
  setupDefaultRoute(router);

  await Promise.all(
    routes.map((init) => {
      return Promise.resolve(init(router));
    }),
  );

  setupComponentRenderer(router);

  hijackNavigation(router);
};

const init = async () => {
  const router = new BlueJacket<Mixins>({
    mixins,
  });

  try {
    await initRoutes(router);

    await router.resolve(mixins.getRouteFromLocation(window.location), {
      historyChange: 'replace',
    });
  } catch (err) {
    log(err);
  }
};

init();
