import css from './ButtonNavigation.module.css';
import clsx from 'clsx';

export default function ButtonNavigation({ page, totalPages, onClick }) {
  function getVisiblePages(current, total) {
    const visible = 1;
    const pages = [];

    if (total < 7) return Array.from({ length: total }, (_, i) => i + 1);

    pages.push(1, 2, 3);

    if (current > visible + 4) {
      pages.push('...');
    }

    for (
      let i = Math.max(4, current - 1);
      i <= Math.min(total - 3, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current + visible < total - 3) {
      pages.push('...');
    }

    pages.push(total - 2, total - 1, total);

    return pages;
  }

  return (
    <div className={css.btns}>
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
