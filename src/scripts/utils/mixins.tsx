/**
 * Router Mixins
 *
 * Mostly helpers for rendering React components
 */

import React from 'react';
import { render } from 'react-dom';
import Debug from 'debug';
import { Context } from 'bluejacket';

const log = Debug('f-app:mixins');

export class Mixins {
  public components: Array<React.ReactElement> = [];

  public addComponent(component: React.ReactElement, index: number = Infinity) {
    const spliceIndex =
      index > this.components.length ? this.components.length : index < 0 ? 0 : index;
    this.components.splice(spliceIndex, 0, component);
  }

  public render() {
    const mountNode = document.querySelector('body > div');
    if (!mountNode) {
      throw new Error('MountNode not found. Something is seriously wrong.');
    }

    const component = <div className="root-container flex-container">{this.components}</div>;

    render(component, mountNode, () => {
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
