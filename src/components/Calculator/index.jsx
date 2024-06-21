import React, { useReducer } from 'react';

const initialState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'clear':
      return initialState;
    case 'input_digit':
      return {
        ...state,
        currentValue: state.currentValue === '0' ? action.digit : state.currentValue + action.digit,
      };
    case 'input_decimal':
      if (state.currentValue.includes('.')) {
        return state;
      }
      return {
        ...state,
        currentValue: state.currentValue + '.',
      };
    case 'set_operator':
      return {
        ...state,
        previousValue: state.currentValue,
        currentValue: '0',
        operator: action.operator,
      };
    case 'calculate':
      if (state.operator == null) {
        return state;
      }
      const current = parseFloat(state.currentValue);
      const previous = parseFloat(state.previousValue);
      let result;
      switch (state.operator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          return state;
      }
      return {
        ...state,
        currentValue: String(result),
        previousValue: null,
        operator: null,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="container mt-5">
      <div className="calculator card">
        <div className="card-body">
          <h1 className="card-title text-center">Calculator</h1>
          <div className="card-text">
            <input
              type="text"
              className="form-control mb-2 text-right"
              value={state.currentValue}
              readOnly
            />
            <div className='row'>
              <div className='col-9 my-2'>
                <button className="btn btn-danger w-100" onClick={() => dispatch({ type: 'clear' })}>C</button>
              </div>
              <div className='col-3 my-2'>
                <button className="btn btn-secondary w-100" onClick={() => dispatch({ type: 'set_operator', operator: '/' })}>/</button>
              </div>

              {[7, 8, 9].map(num => (
                <div className='col-3 my-2'>
                  <button
                    key={num}
                    className="btn btn-light w-100"
                    onClick={() => dispatch({ type: 'input_digit', digit: String(num) })}
                  >
                    {num}
                  </button>
                </div>
              ))}

              <div className='col-3 my-2'>
                <button className="btn btn-secondary w-100" onClick={() => dispatch({ type: 'set_operator', operator: '*' })}>*</button>
              </div>

              {[4, 5, 6].map(num => (
                <div className='col-3 my-2' key={num}>
                  <button

                    className="btn btn-light w-100"
                    onClick={() => dispatch({ type: 'input_digit', digit: String(num) })}
                  >
                    {num}
                  </button>
                </div>
              ))}

              <div className='col-3 my-2'>
                <button className="btn btn-secondary w-100" onClick={() => dispatch({ type: 'set_operator', operator: '-' })}>-</button>
              </div>

              {[1, 2, 3].map(num => (
                <div className='col-3 my-2' key={num}>
                  <button
                    className="btn btn-light w-100"
                    onClick={() => dispatch({ type: 'input_digit', digit: String(num) })}
                  >
                    {num}
                  </button>
                </div>
              ))}

              <div className='col-3 my-2'>
                <button className="btn btn-secondary w-100" onClick={() => dispatch({ type: 'set_operator', operator: '+' })}>+</button>
              </div>

                <div className='col-8 my-2'>
                <button className="btn btn-light w-100" onClick={() => dispatch({ type: 'input_digit', digit: '0' })}>0</button>
                </div>

                <div className='col-1 my-2'>
                <button className="btn btn-light w-100" onClick={() => dispatch({ type: 'input_decimal' })}>.</button>
                </div>

                <div className='col-3 my-2'>
                <button className="btn btn-success w-100" onClick={() => dispatch({ type: 'calculate' })}>=</button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;