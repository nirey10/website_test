import React from 'react';
import '../styles/TableComponent.css'; // New CSS file for styling the table

function TableComponent({ items: boards, onDelete, onOpen, onSort, sortOrder }) {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th onClick={onSort} style={{ cursor: 'pointer' }}>
              ssid {sortOrder === 'asc' ? '▲' : '▼'}
            </th>
            <th>url</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boards.length > 0 ? (
            boards.map((board) => (
              <tr key={board.id}>
                <td>{board.ssid}</td>
                <td>{board.url}</td> {/* Duplicate column */}
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

export default TableComponent;
