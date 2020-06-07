/**
 * Header middleware
 */

import { BlueJacket } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Header } from 'views/header';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle((context) => {
    context.components = []; // Reset components stack for this request
    context.addComponent(Header, 'header');
  });
};
