export default function rootMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      return next(action);
    };
  };
};