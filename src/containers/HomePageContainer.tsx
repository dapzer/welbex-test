import React, { FC, useCallback, useState } from 'react';
import { getData } from "../uttils/fetchApi";
import { useQuery } from "react-query";
import PageSelector from "../components/propagination/PageSelector";
import Filters from "../components/filters/Filters";
import Table from "../components/table/Table";
import { onlyNumbers } from "../uttils/onlyNumbers";

const HomePageContainer: FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsQuantity, setItemsQuantity] = useState(0)
  const [postLimit, setPostLimit] = useState(10)
  const [selectedField, setSelectedField] = useState("")
  const [sortType, setSortType] = useState("")
  const [inputValue, setInputValue] = useState<string>("")
  const [searchValueType, setSearchValueType] = useState("string")

  /*
  * * Изменение текущий страницы
  * @params value - Страница на которую нужно поменять
  **/
  const changePage = useCallback((value: number) => {
    setCurrentPage(value)
  }, [currentPage])

  /*
  * * Изменение значения для поиска
  * @params value - Новое значение для поиска
  **/
  const changeInputValue = useCallback((value: string) => {
    setCurrentPage(1)
    setInputValue(value)
    setSearchValueType(onlyNumbers(value) ? "number" : "string")
  }, [currentPage, inputValue, setInputValue])

  return (
    <div className={"container"}>
      <Filters changeSelectedField={setSelectedField} changeSortType={setSortType} changeInputValue={changeInputValue} />
      <Table currentPage={currentPage} postLimit={postLimit} sortType={sortType} inputValue={inputValue} setItemsQuantity={setItemsQuantity} selectedField={selectedField} searchValueType={searchValueType} />
      <PageSelector currentPage={currentPage} itemsQuantity={itemsQuantity} changePage={changePage} postLimit={postLimit} />
    </div>
  );
};

export default HomePageContainer;
