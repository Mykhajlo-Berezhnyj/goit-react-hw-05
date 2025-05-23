import css from './SearchForm.module.css';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function SearchForm({ onSearch }) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.search.value.trim();
    if (!query) {
      toast.error('Please enter search term!');
      return;
    }
    onSearch(query);
    form.reset();
    form.elements.search.focus();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="search"
        className={css.searchMovie}
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        aria-label="Search movie"
      />
      <button
        className={css.btnSearch}
        type="submit"
        aria-label="Submit search"
      >
        <FiSearch size="16px" />
        Search
      </button>
    </form>
  );
}
