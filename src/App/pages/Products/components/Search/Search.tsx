import { useEffect, useState } from 'react'

import { getCategories } from '@api/fetchApi'
import FilterLogo from '@assets/img/svg/filter.svg'
import { Button, ButtonColor } from '@components/Button'
import Input from '@components/Input'
import { MultiDropdown, Option } from '@components/MultiDropdown'
import { useProductContext } from '@context/ProductContext'
import { IProduct } from '@myTypes/product'

import styles from './search.module.scss'

const Search = () => {
  const { fetchProductsByCategory, fetchWithLimit, searchProduct, limit } =
    useProductContext()

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [categories, setCategories] = useState<Option[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Option | null>(
    null
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategories !== null) {
      fetchProductsByCategory(selectedCategories.value)
    } else {
      fetchWithLimit(limit)
    }
  }, [selectedCategories])

  const fetchCategories = async () => {
    const response = await getCategories()
    const newCategories = response.data.map((element: string) => {
      var id = element + Math.random().toString(16).slice(2)
      const newItem = {
        key: id,
        value: element,
      }
      return newItem
    })
    setCategories(newCategories)
  }

  const switchCategory = (value: { key: string; value: string }) => {
    if (value.key !== selectedCategories?.key) {
      setSelectedCategories(value)
    } else {
      setSelectedCategories(null)
    }
  }

  return (
    <div className={styles['products-search']}>
      <div className={styles['products-search__input']}>
        <Input
          onChange={(value: string) => {
            setSearchTerm(value)
            !value && fetchWithLimit(limit)
          }}
          value={searchTerm}
          type="search"
          placeholder="Search property"
        />
      </div>
      <div className={styles['products-search__button']}>
        <Button onClick={() => searchProduct(searchTerm)}>Find Now</Button>
      </div>
      <div className={styles['products-search__filter']}>
        <MultiDropdown
          options={categories}
          value={selectedCategories}
          onChange={(value: Option) => switchCategory(value)}
          pluralizeOptions={(value: Option | null) =>
            value === null ? ` Filter` : `${value.value}`
          }
        />
      </div>
    </div>
  )
}

export default Search
