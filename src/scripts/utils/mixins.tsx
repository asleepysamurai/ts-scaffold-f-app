/**
 * Router Mixins
 *
 * Mostly helpers for rendering React components
 */

import React from 'react';
import { render } from 'react-dom';
import Debug from 'debug';
import { Context } from 'bluejacket';
import { AppRoot } from 'views';

const log = Debug('f-app:mixins');

export class Mixins {
  public components: Array<React.ReactElement> = [];

  public titlePrefix: string = '';
  public title: string = '';
  public titleSuffix: string = 'F-App';
  public titlePartsDelimiter: string = ' - ';

  public addComponent(
    Component: React.FunctionComponent<any> | React.ComponentClass<any, any>,
    key: string,
    index: number = Infinity,
  ) {
    const spliceIndex =
      index > this.components.length ? this.components.length : index < 0 ? 0 : index;
    this.components.splice(spliceIndex, 0, <Component key={key} />);
  }

  public render() {
    const mountNode = document.querySelector('body > div');
    if (!mountNode) {
      throw new Error('MountNode not found. Something is seriously wrong.');
    }

    render(<AppRoot>{this.components}</AppRoot>, mountNode, () => {
      document.title = [this.titlePrefix, this.title, this.titleSuffix]
        .filter(Boolean)
        .join(this.titlePartsDelimiter);

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      log('Render done.');
    });
  }

  public getRouteFromLocation(location: Location): string {
    return location.href.replace(new RegExp(`^${location.origin}`), '');
  }

  public getURLFromRouteAndCurrentLocation(route: string, location: Location): string {
    return `${location.origin}${route[0] === '/' ? '' : '/'}${route}`;
  }

  public redirectTo(route: string): (context: Context<Mixins>) => void {
    return (context: Context<Mixins>) => {
      context.router.resolve(route, context.data);
      throw 'route';
    };
  }
}

export const mixins = new Mixins();
