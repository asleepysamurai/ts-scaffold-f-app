/**
 * Router Mixins
 *
 * Mostly helpers for rendering React components
 */

import React from 'react';
import { render } from 'react-dom';
import Debug from 'debug';
import { Context, ObjectWithDynamicKeys } from 'bluejacket';
import { AppRoot } from 'views';
import queryString from 'query-string';
import { v4 as uuid } from 'uuid';

const log = Debug('f-app:mixins');

type PropsWithKey = { key: string; [key: string]: any };

export class Mixins {
  public components: Array<React.ReactElement> = [];

  public titlePrefix: string = '';
  public title: string = '';
  public titleSuffix: string = 'F-App';
  public titlePartsDelimiter: string = ' - ';

  private keySuffix: number = 0;

  public addComponent(
    Component: React.FunctionComponent<any> | React.ComponentClass<any, any>,
    key: string,
    index?: number,
  ): void;
  public addComponent(
    Component: React.FunctionComponent<any> | React.ComponentClass<any, any>,
    props: PropsWithKey,
    index?: number,
  ): void;
  public addComponent(
    Component: React.FunctionComponent<any> | React.ComponentClass<any, any>,
    props: string | PropsWithKey,
    index: number = Infinity,
  ): void {
    const spliceIndex =
      index > this.components.length ? this.components.length : index < 0 ? 0 : index;

    let applicableProps: PropsWithKey = typeof props === 'string' ? { key: props } : props;
    applicableProps.key = `${applicableProps.key || uuid()}-${this.keySuffix}`;

    this.components.splice(spliceIndex, 0, <Component {...applicableProps} />);
  }

  public forceRefresh() {
    ++this.keySuffix;
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

  public getQueryFromLocation(location: Location): ObjectWithDynamicKeys {
    return queryString.parse(location.search);
  }

  public getURLFromRouteAndCurrentLocation(route: string, location: Location): string {
    return `${location.origin}${route[0] === '/' ? '' : '/'}${route}`;
  }

  public redirectTo(this: Context<Mixins>, route: string) {
    this.router.resolve(route, this.data);
    throw 'route';
  }
}

export const mixins = new Mixins();
