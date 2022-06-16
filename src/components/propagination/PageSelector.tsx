import React, { FC } from 'react';
import styles from "./page-selector.module.scss"
import usePagination from "../../hooks/usePagination";

interface Props {
  currentPage: number
  itemsQuantity: number
  postLimit: number
  changePage: (value: number) => void
}

const PageSelector: FC<Props> = ({currentPage, itemsQuantity, changePage, postLimit}) => {
  const {pagesNumber, prevPages, nextPages, startPoint, page, quantity} = usePagination({
    currentPage,
    itemsQuantity,
    postLimit
  })

  return (
    <div className={styles.selector}>
      {startPoint >= 4 && (
        <>
          <button onClick={() => changePage(1)}>1</button>
          <button onClick={() => prevPages()}>...</button>
        </>
      )}

      <div className={styles.pages}>
        {pagesNumber && pagesNumber.map((pageNum: number) => (
          <button className={pageNum === page ? styles.active : ''} key={pageNum}
                  onClick={() => changePage(pageNum)}>{pageNum}</button>
        ))}
      </div>

      {startPoint < quantity - 4 && (
        <>
          <button onClick={() => nextPages()}>...</button>
          <button onClick={() => changePage(quantity)}>{quantity}</button>
        </>
      )}
    </div>
  );
};

export default PageSelector;
