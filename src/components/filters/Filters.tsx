import React, { FC, useEffect, useState } from 'react';
import styles from "./filters.module.scss"
import { SortDefaultValues } from "../../types/sortDefaultValues";
import { FieldDefaultNames } from "../../types/fieldDefaultNames";

interface Props {
  changeSelectedField: (value: string) => void
  changeSortType: (value: string) => void
  changeInputValue: (value: string) => void
}

const Filters: FC<Props> = ({changeSelectedField, changeSortType, changeInputValue}) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  // * По окончанию таймера передаём данные в переменную для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      changeInputValue((inputValue !== '') ? inputValue : "")
    }, 900)

    return () => clearTimeout(timer)
  }, [inputValue])

  return (
    <div className={styles.filters}>
      <button onClick={() => setFiltersVisible(!filtersVisible)}>{filtersVisible ? "Скрыть фильтры" : "Показать фильтры"}</button>
      {filtersVisible && (
        <div className={styles.filtersList}>
          <select onChange={(e) => changeSelectedField(e.target.value)}>
            <option value="">Выберите колонку для фильтраций</option>
            <option value={FieldDefaultNames.name}>Название</option>
            <option value={FieldDefaultNames.quantity}>Количество</option>
            <option value={FieldDefaultNames.distance}>Расстояние</option>
          </select>
          <select onChange={(e) => changeSortType(e.target.value)}>
            <option value="">Выберите условие фильтрации</option>
            <option value={SortDefaultValues.less}>Меньше</option>
            <option value={SortDefaultValues.more}>Больше</option>
            <option value={SortDefaultValues.equals}>Равно</option>
            <option value={SortDefaultValues.contains}>Содержит</option>
          </select>
          <input type="text" onChange={(e) => setInputValue(e.target.value)}
                 placeholder="Введите значение"/>
        </div>
      )}
    </div>
  );
};

export default Filters;
