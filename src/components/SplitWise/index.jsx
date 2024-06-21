import React, { useReducer, useState } from 'react';


const initialState = {
  groups: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'create_group':
      return {
        ...state,
        groups: [...state.groups, { id: Date.now(), name: action.name, users: [], expenses: [] }],
      };
    case 'add_user':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.groupId ? { ...group, users: [...group.users, action.user] } : group
        ),
      };
    case 'add_expense':
      return {
        ...state,
        groups: state.groups.map(group =>
          group.id === action.groupId
            ? { ...group, expenses: [...group.expenses, action.expense] }
            : group
        ),
      };
    default:
      throw new Error('Unknown action type');
  }
}

function Splitwise() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [groupName, setGroupName] = useState('');
  const [userName, setUserName] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseSplitType, setExpenseSplitType] = useState('equal');
  const [percentageShares, setPercentageShares] = useState({});
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      dispatch({ type: 'create_group', name: groupName });
      setGroupName('');
    }
  };

  const handleAddUser = (groupId) => {
    if (userName.trim()) {
      dispatch({ type: 'add_user', groupId, user: userName });
      setUserName('');
    }
  };

  const handleAddExpense = (groupId) => {
    if (expenseDescription.trim() && expenseAmount) {
      let expense = { description: expenseDescription, amount: parseFloat(expenseAmount), splitType: expenseSplitType, shares: {} };
      const group = state.groups.find(group => group.id === groupId);

      if (expenseSplitType === 'equal') {
        const shareAmount = parseFloat(expenseAmount) / group.users.length;
        group.users.forEach(user => {
          expense.shares[user] = shareAmount;
        });
      } else if (expenseSplitType === 'percentage') {
        group.users.forEach(user => {
          expense.shares[user] = (expense.amount * (percentageShares[user] || 0)) / 100;
        });
      }

      dispatch({
        type: 'add_expense',
        groupId,
        expense,
      });

      setExpenseDescription('');
      setExpenseAmount('');
      setExpenseSplitType('equal');
      setPercentageShares({});
    }
  };

  return (
    <div className="container mt-5 border rounded w-50 ms-0">
      <h1 className="text-center mb-4">Splitwise Lite</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleCreateGroup}>Create Group</button>
      </div>
      <ul className="list-group">
        {state.groups.map((group) => (
          <li key={group.id} className="list-group-item mb-3">
            <h2>{group.name}</h2>
            <div className="mb-2">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={() => handleAddUser(group.id)}>Add User</button>
            </div>
            <div className="mb-2">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Expense Description"
                value={expenseDescription}
                onChange={(e) => setExpenseDescription(e.target.value)}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
              <select
                className="form-control mb-2"
                value={expenseSplitType}
                onChange={(e) => setExpenseSplitType(e.target.value)}
              >
                <option value="equal">Equal</option>
                <option value="percentage">Percentage</option>
              </select>
              {expenseSplitType === 'percentage' && group.users.map((user) => (
                <div key={user} className="mb-2">
                  <label>{user}'s share (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Percentage"
                    value={percentageShares[user] || ''}
                    onChange={(e) => setPercentageShares({
                      ...percentageShares,
                      [user]: parseFloat(e.target.value)
                    })}
                  />
                </div>
              ))}
              <button className="btn btn-success" onClick={() => handleAddExpense(group.id)}>Add Expense</button>
            </div>
            <h3>Users</h3>
            <ul className="list-group">
              {group.users.map((user, index) => (
                <li key={index} className="list-group-item">{user}</li>
              ))}
            </ul>
            <h3>Expenses</h3>
            <ul className="list-group">
              {group.expenses.map((expense, index) => (
                <li key={index} className="list-group-item">
                  {expense.description} - ${expense.amount} ({expense.splitType}) <br/>
                  <ul>
                    {Object.keys(expense.shares).map((user, i) => (
                      <li key={i}>{user}: ${expense.shares[user]}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Splitwise;