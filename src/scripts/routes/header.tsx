/**
 * Header middleware
 */

import { BlueJacket } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { Component } from 'views/header';
import { apiClient } from 'utils/apiClient';

export const setup = (router: BlueJacket<Mixins>) => {
  router.handle((context) => {
    context.components = []; // Reset components stack for this request
    context.addComponent(Component, {
      key: 'header',
      userLoggedIn: () => {
        return apiClient.hasAuthToken;
      },
    });
  });
};
