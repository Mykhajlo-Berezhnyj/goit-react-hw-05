import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      <ContactForm onContact={addContact} />
      <SearchBox value={filter} onFilterChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
