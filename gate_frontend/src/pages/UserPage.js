import React, { useEffect, useState } from 'react';
import '../styles/BoardPage.css';  // Make sure to update your styles as well
import UsersTableComponent from '../components/UsersTableComponent';

const apiUrl = 'http://localhost:5000/users'; // Updated API endpoint for users

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch users from the backend
  const fetchUsers = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setUsers(data);
  };

  // Add a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const nationalityid = document.getElementById('user-nationalityid-input').value;
    const firstname = document.getElementById('user-firstname-input').value;
    const lastname = document.getElementById('user-lastname-input').value;
    const email = document.getElementById('user-email-input').value;

    if (!nationalityid || !firstname || !lastname || !email) return;

    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nationalityId: nationalityid, firstName: firstname, lastName: lastname, email:email }),
    });

    // Clear input fields after adding user
    document.getElementById('user-nationalityid-input').value = '';
    document.getElementById('user-firstname-input').value = '';
    document.getElementById('user-lastname-input').value = '';
    document.getElementById('user-email-input').value = '';

    fetchUsers(); // Refresh the list of users
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchUsers(); // Refresh the list of users
  };

  // Search and filter users
  const filteredUsers = users
    .filter(user => 
      user.nationalityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (sortOrder === 'asc' ? a.firstName.localeCompare(b.firstName) : b.firstname.localeCompare(a.firstName)));

  useEffect(() => {
    fetchUsers(); // Fetch users when the component is first mounted
  }, []);

  return (
    <div className="BoardPage">
      <header className="BoardPage-header">
        <h1>Users List</h1>
        <form id="user-form" onSubmit={handleAddUser}>
          <input type="text" id="user-nationalityid-input" placeholder="Insert nationality ID" required />
          <input type="text" id="user-firstname-input" placeholder="Insert first name" required />
          <input type="text" id="user-lastname-input" placeholder="Insert last name" required />
          <input type="email" id="user-email-input" placeholder="Insert email" required />
          <button type="submit">Add</button>
        </form>
        <br />
        <input 
          type="text" 
          placeholder="Search users..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <UsersTableComponent 
          items={filteredUsers} 
          onDelete={handleDeleteUser} 
          onSort={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
          sortOrder={sortOrder}
        />
      </header>
    </div>
  );
}

export default UsersPage;