import { useRef } from 'react';
import css from './ButtonNavigation.module.css';
import clsx from 'clsx';

export default function ButtonNavigation({ page, totalPages, onClick }) {
  const inputRef = useRef(null);

  function getVisiblePages(current, total) {
    const visible = 1;
    const pages = [];

    if (total < 7) return Array.from({ length: total }, (_, i) => i + 1);

    pages.push(1, 2);

    if (current > visible + 3) {
      pages.push('...');
    }

    for (
      let i = Math.max(3, current - 1);
      i <= Math.min(total - 2, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current + visible < total - 3) {
      pages.push('...');
    }

    pages.push(total - 1, total);

    return pages;
  }

  const handleGoPage = () => {
    const goPage = inputRef.current.value.trim();
    onClick(goPage < totalPages ? goPage : totalPages);
    inputRef.current.value = '';
  };

  return (
    <div className={css.btns}>
      {totalPages > 5 && (
        <div>
          <input
            className={css['input-btn']}
            type="number"
            name="page-number"
            placeholder="page?"
            ref={inputRef}
            onChange={e => {
              if (e.target.value === '') return;
              if (e.target.value < 1) e.target.value = 1;
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleGoPage();
            }}
          />
          <button
            className={css['btn-nav']}
            type="button"
            onClick={handleGoPage}
          >
            Go
          </button>
        </div>
      )}
      <button
        type="button"
        className={css['btn-nav']}
        onClick={() => onClick(page - 1)}
        disabled={page <= 1}
      >
        Prev
      </button>
      {getVisiblePages(page, totalPages).map((num, index) =>
        num === '...' ? (
          <span key={`dots-${index}`} className={css.dots}>
            ...
          </span>
        ) : (
          <button
            type="button"
            key={num}
            className={clsx(css['btn-nav'], { [css.active]: num === page })}
            onClick={() => onClick(num)}
          >
            {num}
          </button>
        ),
      )}
      <button
        type="button"
        className={css['btn-nav']}
        onClick={() => onClick(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
