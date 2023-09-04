import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

const App = () => {
  const [displayAddFriend, setDisplayAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);

  const handleAddFriend = () => {
    setDisplayAddFriend((currState) => !currState);
  };

  const handleAddNewFriend = (newFriend) => {
    setFriendList((friendList) => [...friendList, newFriend]);
    setDisplayAddFriend(false);
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList friends={friendList} />
        {displayAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
        <Button onClick={handleAddFriend}>
          {displayAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      <FormSplitBill />
    </div>
  );
};

const FriendsList = ({ friends }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} />
      ))}
    </ul>
  );
};

const Friend = ({ friend }) => {
  return (
    <li key={friend.id}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you ${friend.balance}
        </p>
      )}

      <Button>Select</Button>
    </li>
  );
};

const Button = ({ onClick, children }) => (
  <button className='button' onClick={onClick}>
    {children}
  </button>
);

const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    if (!name || !image) return;

    onAddFriend(newFriend);
  };

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label>* Friend name</label>
      <input
        type='text'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label>* Image URL</label>
      <input
        type='text'
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className='form-split-bill'>
      <h2>Split a bill with X</h2>

      <label>$ Bill Value</label>
      <input type='text' />

      <label>$ Your Expense</label>
      <input type='text' />

      <label>$ X's expense</label>
      <input type='text' disabled />

      <label>$ Who is paying the bill</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
