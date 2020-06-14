/**
 * Footer middleware
 */

import { BlueJacket } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/footer';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle((context) => {
    context.addComponent(Component, 'footer');
  });
};
