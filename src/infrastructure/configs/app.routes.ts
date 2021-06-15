const dealersRoot = '/dealers';

export const routes = {
  user: {
    root: dealersRoot,
    delete: `${dealersRoot}/:id`,
  },
};
