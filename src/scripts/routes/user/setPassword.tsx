/**
 * User setPassword page
 */

import { Context } from 'bluejacket';
import { Mixins } from 'utils/mixins';
import { SetPassword } from 'views/user/setPassword';

export const handle = async (context: Context<Mixins>) => {
  context.title = 'Set Account Password';
  context.addComponent(SetPassword, { key: 'setPassword', code: context.data.code });
};
