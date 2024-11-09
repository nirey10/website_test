import React from 'react';
import '../styles/TableComponent.css'; // New CSS file for styling the table

function UsersTableComponent({ items: users, onDelete, onOpen, onSort, sortOrder }) {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>id</th>
            <th onClick={onSort} style={{ cursor: 'pointer' }}>
            nationalityid {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>firstname</th>
            <th>lastname</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((board) => (
              <tr key={board.id}>
                <td>{board.nationalityId}</td>
                <td>{board.firstName}</td>
                <td>{board.lastName}</td>
                <td>{board.email}</td>
                <td>
                  <button onClick={() => onDelete(board.id)}>Delete</button>
                  <button onClick={() => onOpen(board.id)}>Open</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No boards found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTableComponent;
