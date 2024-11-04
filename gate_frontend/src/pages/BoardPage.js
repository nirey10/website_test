import React, { useEffect, useState } from 'react';
import '../styles/BoardPage.css';
import TableComponent from '../components/TableComponent';


const apiUrl = 'http://localhost:5000/boards';

function BoardPage() {
  const [boards, setBoards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch boards from the backend
  const fetchBoards = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setBoards(data);
  };

  // Add a new board
  const handleAddBoard = async (e) => {
    e.preventDefault();
    const boardSsid = document.getElementById('board-ssid-input').value;
    if (!boardSsid) return;
    const boardUrl = document.getElementById('board-url-input').value;
    if (!boardUrl) return;

    await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssid: boardSsid, url: boardUrl }),
    });

    document.getElementById('board-ssid-input').value = '';
    document.getElementById('board-url-input').value = '';
    fetchBoards();
  };

  // Delete an board
  const handleDeleteBoard = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchBoards();
  };
  const handleOpen = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'GET' });
  };

  // Search and Filter boards
  const filteredBoards = boards
    .filter(board => board.ssid.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === 'asc' ? a.ssid.localeCompare(b.ssid) : b.ssid.localeCompare(a.ssid)));

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="BoardPage">
      <header className="BoardPage-header">
        <h1>Boards List</h1>
        <form id="item-form" onSubmit={handleAddBoard}>
          <input type="text" id="board-ssid-input" placeholder="Insert board ssid" required />
          <input type="text" id="board-url-input" placeholder="Inser board url" required />
          <button type="submit">Add</button>
        </form>
        <br></br>
        <input 
          type="text" 
          placeholder="Search boards..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <TableComponent 
          items={filteredBoards} 
          onDelete={handleDeleteBoard} 
          onOpen={handleOpen}
          onSort={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          sortOrder={sortOrder}
        />
      </header>
    </div>
  );
}

export default BoardPage;
