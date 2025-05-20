import css from './ButtonNavigation.module.css';

export default function ButtonNavigation({ page, totalPages, onClick }) {
    
    function getVisiblePages(current, total) {
        const visible = 2;
        const pages = [];

        if (total < 7) return Array.from({ length: total }, (_, i) => i + 1);
        
        pages.push(1);

        if (current > visible + 2 ) {
            pages.push('...');
        }
        
        for (let i = Math.max(2, current-2); i <= Math.min(total-1, current+2); i++) {
            pages.push(i);
        }

        if (current + visible < total-1) {
            pages.push('...')
        }

        pages.push(total);

        return pages;
    };
 


    return (
        <div className={css.btns}>
            {getVisiblePages(page, totalPages).map((num, index) => 
                num ==='...' ? (<span key={`dots-${index}`} className={css.dots}>...</span>) :
            (<button type='button' key={num} className={css['btn-nav']} onClick={() => onClick(num)}>{num}</button>)
                )}
        </div>
    );
}

