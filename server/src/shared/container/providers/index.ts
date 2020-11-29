import { container } from 'tsyringe';

import BCryptHashProvider from './HashProvider/BCryptHashProvider';

container.registerSingleton('HashProvider', BCryptHashProvider);
