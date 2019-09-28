export default function rootMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      console.log("middle " + action.type);
      // do your stuff
      /*
      if (action.type === ADD_ARTICLE) {
        
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: "FOUND_BAD_WORD" });
        }
      }
      */
      return next(action);
    };
  };
};