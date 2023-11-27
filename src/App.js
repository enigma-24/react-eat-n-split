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
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = () => {
    setDisplayAddFriend((currState) => !currState);
  };

  const handleAddNewFriend = (newFriend) => {
    setFriendList((friendList) => [...friendList, newFriend]);
    setDisplayAddFriend(false);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend((curFriend) =>
      curFriend?.id === friend.id ? null : friend
    );
    setDisplayAddFriend(false);
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          friends={friendList}
          onFriendSelect={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {displayAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
        <Button onClick={handleAddFriend}>
          {displayAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
};

const FriendsList = ({ friends, onFriendSelect, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          selectFriend={onFriendSelect}
          isSelected={friend.id === selectedFriend?.id}
        />
      ))}
    </ul>
  );
};

const Friend = ({ friend, selectFriend, isSelected }) => {
  return (
    <li key={friend.id} className={isSelected ? 'selected' : ''}>
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

      <Button onClick={() => selectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
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

const FormSplitBill = ({ selectedFriend }) => {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setwhoIsPaying] = useState('user');

  return (
    <form className='form-split-bill'>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>$ Bill Value</label>
      <input
        type='text'
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>$ Your Expense</label>
      <input
        type='text'
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>$ {selectedFriend.name}'s expense</label>
      <input type='text' value={paidByFriend} disabled />

      <label>$ Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
