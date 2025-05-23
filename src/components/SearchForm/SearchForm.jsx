import { Form } from 'react-router-dom';
import css from './SearchForm.module.css';
import { FiSearch } from 'react-icons/fi';

export default function SearchForm({ onSearch }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.search.value.trim();
    onSearch(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input type="text" name="search" className={css.searchMovie} />
      <button className={css.btnSearch} type="submit">
        <FiSearch size="16px" />
        Search
      </button>
    </form>
  );
}
