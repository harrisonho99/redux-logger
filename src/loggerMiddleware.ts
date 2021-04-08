import { MiddlewareAPI } from 'redux';

//heppler colored
function coloredLogger(
  content: string,
  background: string = 'transparent',
  padding: number = 0,
  color: string = 'black',
  fontSize: number = 10,
  ...agrs: any[]
) {
  if (content) {
    console.log(
      `%c ${content}`,
      `background:${background}; padding:${padding}px; color:${color}; margin: 3px; font-size:${fontSize}px`,
      ...agrs
    );
  }
}

//logger middleware
const loggerMiddleware = (storeAPI: MiddlewareAPI<any>) => {
  return function wrapperDispatch(next: any) {
    return function handleActionDispatching(action: any) {
      try {
        coloredLogger(
          '<-prev state->',
          '#f73378',
          2,
          'white',
          12,
          storeAPI.getState()
        );
        // pipe action
        next(action);
        coloredLogger(' action: ' + action.type, undefined, 0, '#304ffe', 12);
        //
        coloredLogger(
          '<-next state->',
          '#14a37f',
          2,
          'white',
          12,
          storeAPI.getState()
        );
        coloredLogger(
          '------------------------',
          undefined,
          undefined,
          'green'
        );
      } catch (error) {
        console.error(error.message);
      }
    };
  };
};

export default loggerMiddleware;
