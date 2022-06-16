import { useEffect, useState } from "react";
// @ts-ignore
import _ from 'lodash';

interface Props {
  currentPage: number
  itemsQuantity: number
  postLimit: number
}

const usePagination = ({currentPage, postLimit, itemsQuantity}: Props) => {
  const [quantity, setQuantity] = useState(0)
  const [startPoint, setStartPoint] = useState(0)
  const [endPoint, setEndPoint] = useState(0)
  let page = currentPage

  // * Считаем количество страниц
  let baseQuantity = Math.ceil(itemsQuantity / postLimit)

  //  * Проверяем, изменилось ли количество постов
  if (!isNaN(baseQuantity) && quantity != baseQuantity) {
    setQuantity(baseQuantity)
  }

  // * Вычисление начальной страницы для отображения в зависимости от текущей
  const startPointFormula = () => {
    if (quantity > 4) {

      if (page + 2 < quantity) {

        if (page <= 3) {
          return 1
        } else {
          return page - 1
        }
      } else {
        return quantity - 3
      }
    } else {
      return 1
    }
  }

  // * Вычисление конечной страницы для отображения в зависимости от текущей
  const endPointFormula = () => {
    if ((page + 2) < quantity) {

      if (page <= 3) {
        return 5
      } else {
        return page + 3
      }
    } else {
      return quantity + 1
    }
  }

  // * При переключении страницы или изменения количества постов обновляем начальную и конечную страницу для генераций массива
  useEffect(() => {
    setStartPoint(startPointFormula)
    setEndPoint(endPointFormula)
  }, [page, quantity])

  // * Промежуток страниц для отображения
  let pagesNumber = _.range(startPoint, Math.ceil(endPoint))

  // * Функция для отображения следующих 4 страниц
  const nextPages = () => {
    setStartPoint((startPoint + 4) <= (quantity - 4) ? startPoint + 4 : quantity - 4)
    setEndPoint((endPoint + 4) <= quantity ? endPoint + 4 : quantity)
  }

  // * Функция для отображения предыдущих 4 страниц
  const prevPages = () => {
    setStartPoint((startPoint - 4) >= 1 ? startPoint - 4 : 1)
    setEndPoint((endPoint - 4) >= 1 ? endPoint - 4 : startPoint + 4)
  }

  return {pagesNumber, prevPages, nextPages, startPoint, page, quantity}
};

export default usePagination;
