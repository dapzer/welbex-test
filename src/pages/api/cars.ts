import type { NextApiRequest, NextApiResponse } from 'next'
import { SortDefaultValues } from "../../types/sortDefaultValues";
import { CarType } from "../../types/carType";
import { CarsArray } from "../../mocks/carsArray";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let cars = CarsArray
  let selectedFieldIndex = req.query.field as keyof CarType
  let searchValue: string = req.query.searchValue as string

  // * Проверка на равенство двух строк
  if (req.query.field && (req.query.sortType === SortDefaultValues.equals)) {
    cars = cars.filter((item) => item[selectedFieldIndex] === searchValue)
  }

  // * Проверка на больше / меньше
  if (req.query.field && (req.query.sortType === SortDefaultValues.more) || (req.query.sortType === SortDefaultValues.less) ) {
    cars = cars.filter((item) => {
      if (req.query.sortType === SortDefaultValues.more) {
        return item[selectedFieldIndex] > searchValue
      }else {
        return item[selectedFieldIndex] < searchValue
      }
    })
  }

  // * Проверка на содержание данных в выбранном поле
  if (req.query.field && (req.query.sortType === SortDefaultValues.contains)) {
    cars = cars.filter((item) => {
      return (item[selectedFieldIndex] as string).toString().toLowerCase().includes((searchValue as string).toLowerCase())
    })
  }

  // * Количество записей
  const dataQuantity = cars.length

  // * Пагинация
  if (req.query.limit && +req.query.page > 0) {
    const page = +req.query.page
    const limit = +req.query.limit
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    cars = cars.slice(startIndex, endIndex)
  }

  res.status(200).json({data: cars, dataQuantity: dataQuantity})
}
