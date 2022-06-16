import React, { FC, useCallback, useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { getData } from "../../uttils/fetchApi";
import styles from "./table.module.scss"
import { DataArrayType } from '../../types/dataArrayType';
import { CarType } from "../../types/carType";
import { FieldDefaultNames } from "../../types/fieldDefaultNames";

interface Props {
  currentPage: number
  postLimit: number
  sortType: string
  inputValue: string | number
  setItemsQuantity: (value: number) => void
  selectedField: string
  searchValueType: string
}

const TableColumns = [
  {
    title: "Дата",
    sortValue: FieldDefaultNames.date
  },
  {
    title: "Название",
    sortValue: FieldDefaultNames.name
  },
  {
    title: "Количество",
    sortValue: FieldDefaultNames.quantity
  },
  {
    title: "Расстояние",
    sortValue: FieldDefaultNames.distance
  },
]

const Table: FC<Props> = ({currentPage, postLimit, sortType, inputValue, setItemsQuantity, selectedField, searchValueType}) => {
  let {data, isLoading} = useQuery<DataArrayType>(["data", {
    page: currentPage,
    sortType: sortType,
    limit: postLimit,
    searchValue: inputValue,
    field: selectedField,
    searchValueType: searchValueType
  }], getData)
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentSortColumn, setCurrentSortColumn] = useState("")

  // * При получении / обновлений данных, устанавливаем количество записей для пагинации
  useEffect(() => {
    setItemsQuantity(data ? data.dataQuantity : 0)
  }, [data])

  /*
  * * Сортировка по колонки в таблице
  * @param column - Колонка по которой необходимо провести сортировку
  */
  const sortTable = (column: string) => {
    let columnIndex = column as keyof CarType
    if (currentSortColumn !== column) {
      setSortOrder("asc")
    }

    if (sortOrder === "asc") {
      data && data.data.sort((a, b) => a[columnIndex] < b[columnIndex] ? 1 : -1)
      setSortOrder("dsc")
    } else {
      data && data.data.sort((a, b) => a[columnIndex] > b[columnIndex] ? 1 : -1)
      setSortOrder("asc")
    }
    setCurrentSortColumn(column)
  }

  return (
    <div className={styles.tableContainer}>
      {!isLoading && (
        <table className={styles.table}>
          <thead>
          {TableColumns.map((item, index) => (
            <th key={index} scope="col" onClick={() => sortTable(item.sortValue)}>{item.title}</th>
          ))}
          </thead>
          <tbody>
          {data && data.data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.distance} km.</td>
            </tr>
          ))}
          </tbody>
        </table>)}
    </div>
  );
};

export default Table;
